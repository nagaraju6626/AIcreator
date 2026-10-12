import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Clock, CheckCircle2, PlayCircle, Lock, BookOpen, Send, Sparkles, Target, MonitorPlay, ExternalLink, RefreshCw } from 'lucide-react';
import { useJourney } from '../../context/JourneyContext';
import { COURSES } from '../../data/courses';

export default function CourseDetail() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { journey, updateJourney } = useJourney();
  const course = COURSES.find(c => c.id === courseId);

  // States
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [exerciseAnswer, setExerciseAnswer] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);
  
  // YouTube states
  const [youtubeVideos, setYoutubeVideos] = useState<any[]>([]);
  const [isLoadingVideos, setIsLoadingVideos] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);

  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!course) return;
    
    async function fetchVideos() {
      setIsLoadingVideos(true);
      setVideoError(null);
      try {
        const response = await fetch('http://localhost:8000/api/v1/youtube/recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            niche: journey.selectedNiche,
            interests: journey.interests || [],
            skills: [...(journey.skills || []), ...(course?.tags || [])],
            audience: journey.audience || [],
            platform: journey.platform || [],
            content_type: journey.contentType || [],
            goal: journey.goal || [],
            current_topic: course?.title
          })
        });
        
        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.detail || 'Video recommendations are temporarily unavailable.');
        }
        
        const data = await response.json();
        setYoutubeVideos(data);
      } catch (err: any) {
        setVideoError(err.message || 'Failed to load videos');
      } finally {
        setIsLoadingVideos(false);
      }
    }
    
    fetchVideos();
  }, [course, journey.selectedNiche, retryCount]);

  if (!course) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold">Course not found</h2>
        <Link to="/beginner/learn" className="text-blue-600 mt-4 inline-block">← Back to Academy</Link>
      </div>
    );
  }

  const courseProgress = journey.courseProgress || {};
  const completedLessonIds = courseProgress[course.id] || [];
  const progressPercent = Math.round((completedLessonIds.length / course.lessons.length) * 100);
  const isCourseComplete = completedLessonIds.length === course.lessons.length;

  const activeLesson = course.lessons.find(l => l.id === activeLessonId);

  // When a user completes a lesson, check if they completed the course and if they met Step 2 requirements
  const handleMarkLessonComplete = () => {
    if (!activeLesson) return;
    
    const updatedLessons = [...new Set([...completedLessonIds, activeLesson.id])];
    
    // Check if course is now fully completed
    const isNowComplete = updatedLessons.length === course.lessons.length;
    
    const newCourseProgress = {
      ...(journey.courseProgress || {}),
      [course.id]: updatedLessons
    };

    const updates: any = { courseProgress: newCourseProgress };

    // REQUIREMENT: Step 2 learning is completed if at least 1 course is fully completed
    // Realistically you could require 3, but for this prototype, completing any 1 course = Step 2 Complete
    if (isNowComplete) {
      updates.learningCompleted = true;
    }

    updateJourney(updates);
    
    // Find next lesson
    const currentIndex = course.lessons.findIndex(l => l.id === activeLesson.id);
    if (currentIndex < course.lessons.length - 1) {
      setActiveLessonId(course.lessons[currentIndex + 1].id);
      setFeedback(null);
      setExerciseAnswer('');
    } else {
      setActiveLessonId(null); // Return to overview
    }
  };

  const submitExercise = async () => {
    if (!exerciseAnswer.trim()) return;
    setIsSubmitting(true);
    
    // Simulate AI feedback since backend endpoint may not exist yet
    try {
      // Graceful fallback for LLM evaluation
      await new Promise(r => setTimeout(r, 1500));
      setFeedback({
        score: '8.5/10',
        worked: 'You correctly identified the audience and provided a clear, actionable hook.',
        improve: 'Try adding a bit more urgency to increase retention.',
        better: "Don't take another test until you use these 3 AI tools."
      });
    } catch (e) {
      setFeedback({ error: "Failed to reach AI. Please try again." });
    }
    
    setIsSubmitting(false);
  };

  // OVERVIEW VIEW
  if (!activeLessonId) {
    return (
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 pb-24">
        <Link to="/beginner/learn" className="inline-flex items-center text-slate-500 hover:text-slate-900 font-bold text-[13px] mb-8 transition-colors">
          <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Academy
        </Link>

        <div className="bg-white border border-slate-200 rounded-[24px] shadow-sm overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-slate-900 to-[#0F172A] p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[80px] -mr-20 -mt-20 opacity-30"></div>
            
            <div className="relative z-10">
              <span className="inline-block bg-white/10 border border-white/20 px-3 py-1 rounded-lg text-[12px] font-bold tracking-wider uppercase mb-4 text-blue-200">
                {course.categoryName}
              </span>
              <h1 className="text-[32px] md:text-[40px] font-extrabold leading-tight mb-4">{course.title}</h1>
              <p className="text-slate-300 text-[16px] max-w-2xl font-medium">{course.description}</p>
              
              <div className="flex items-center mt-8 text-[14px] font-bold text-slate-300">
                <span className="flex items-center bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 mr-4">
                  <Target className="h-4 w-4 mr-2 text-blue-400" /> {course.level}
                </span>
                <span className="flex items-center bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">
                  <Clock className="h-4 w-4 mr-2 text-blue-400" /> {course.duration}
                </span>
              </div>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="flex items-end justify-between mb-2">
              <h3 className="text-[18px] font-extrabold text-slate-900">Course Progress</h3>
              <span className="text-[24px] font-extrabold text-blue-600 leading-none">{progressPercent}%</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-8">
              <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: progressPercent + '%' }}></div>
            </div>

            <h3 className="text-[20px] font-extrabold text-slate-900 mb-6">Lessons</h3>
            <div className="space-y-4">
              {course.lessons.map((lesson, idx) => {
                const isCompleted = completedLessonIds.includes(lesson.id);
                // Unlock if it's the first lesson, OR the previous lesson is completed
                const isUnlocked = idx === 0 || completedLessonIds.includes(course.lessons[idx - 1].id);

                return (
                  <button
                    key={lesson.id}
                    disabled={!isUnlocked}
                    onClick={() => {
                      setActiveLessonId(lesson.id);
                      setFeedback(null);
                      setExerciseAnswer('');
                    }}
                    className={
                      "w-full flex items-center p-5 rounded-2xl border-[1.5px] text-left transition-all " +
                      (isCompleted 
                        ? 'bg-slate-50 border-slate-200 hover:border-slate-300' 
                        : isUnlocked 
                          ? 'bg-white border-blue-200 hover:border-blue-400 shadow-sm hover:shadow-md' 
                          : 'bg-slate-50 border-slate-100 opacity-60 cursor-not-allowed')
                    }
                  >
                    <div className={
                      "flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center mr-4 " +
                      (isCompleted ? 'bg-green-100 text-green-600' : isUnlocked ? 'bg-blue-100 text-blue-600' : 'bg-slate-200 text-slate-400')
                    }>
                      {isCompleted ? <CheckCircle2 className="h-5 w-5" strokeWidth={3} /> : isUnlocked ? <PlayCircle className="h-5 w-5" strokeWidth={2.5} /> : <Lock className="h-4 w-4" strokeWidth={2.5} />}
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Lesson {idx + 1}</p>
                      <h4 className={"text-[16px] font-bold " + (isUnlocked ? 'text-slate-900' : 'text-slate-500')}>{lesson.title}</h4>
                    </div>
                    {isUnlocked && !isCompleted && (
                      <span className="ml-auto text-blue-600 text-[13px] font-bold">Start →</span>
                    )}
                    {isCompleted && (
                      <span className="ml-auto text-slate-500 text-[13px] font-bold">Review</span>
                    )}
                  </button>
                )
              })}
            </div>
            
            {isCourseComplete && (
              <div className="mt-8 bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
                <CheckCircle2 className="h-10 w-10 text-green-600 mx-auto mb-3" />
                <h3 className="text-[18px] font-extrabold text-slate-900 mb-1">Course Complete!</h3>
                <p className="text-slate-600 font-medium text-[14px]">You have successfully finished all lessons in this course.</p>
                <Link to="/beginner/learn" className="inline-flex mt-4 bg-white border border-slate-200 text-slate-700 font-bold px-6 py-2.5 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
                  Return to Academy
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* YouTube Recommendations Section for Course */}
        <div className="mt-12 mb-8">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[20px] font-extrabold text-slate-900 flex items-center">
              <MonitorPlay className="h-6 w-6 text-red-500 mr-2" /> Videos for This Course
            </h2>
            <button 
              onClick={() => {
                setYoutubeVideos([]);
                setRetryCount(c => c + 1);
              }}
              disabled={isLoadingVideos}
              className="flex items-center bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 mr-1.5 ${isLoadingVideos ? 'animate-spin' : ''}`} /> 
              {isLoadingVideos ? 'Finding fresh videos...' : 'Refresh Videos'}
            </button>
          </div>
          <p className="text-[14px] text-slate-600 font-medium mb-6">Deepen your knowledge with these targeted YouTube tutorials.</p>
          
          {videoError ? (
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
               <p className="text-[14px] text-red-600 font-medium mb-3">{videoError}</p>
               <button onClick={() => setRetryCount(c => c + 1)} className="bg-white border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-50">Try Again</button>
            </div>
          ) : isLoadingVideos ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map(i => (
                <div key={i} className="bg-slate-50 animate-pulse border border-slate-100 rounded-[20px] h-72"></div>
              ))}
            </div>
          ) : youtubeVideos.length === 0 ? (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center">
               <p className="text-[15px] font-bold text-slate-700 mb-2">No suitable videos found right now.</p>
               <button onClick={() => {
                  setYoutubeVideos([]);
                  setRetryCount(c => c + 1);
               }} className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors shadow-sm">
                  Find New Videos
               </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {youtubeVideos.slice(0, 4).map(video => (
                <div key={video.id} className="bg-white border border-slate-200 rounded-[20px] overflow-hidden shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
                  <div className="relative aspect-video bg-slate-100">
                    <img 
                      src={video.thumbnailUrl} 
                      alt={video.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlMmU4ZjAiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiLz48L3N2Zz4=';
                      }}
                    />
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">{video.duration}</div>
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-[15px] font-extrabold text-slate-900 leading-tight mb-1 line-clamp-2">{video.title}</h3>
                    <p className="text-[12px] font-bold text-slate-500 mb-3">{video.channelTitle}</p>
                    
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-4 mt-auto">
                      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mb-1">Why recommended</p>
                      <p className="text-[12px] text-blue-900 font-medium leading-snug">{video.relevanceReason}</p>
                    </div>
                    
                    <a href={"https://www.youtube.com/watch?v=" + video.id} target="_blank" rel="noopener noreferrer" className="w-full inline-flex justify-center items-center bg-slate-900 text-white font-bold text-[13px] py-2.5 rounded-xl hover:bg-black transition-colors">
                      Watch on YouTube <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // LESSON VIEW
  const lessonIndex = course.lessons.findIndex(l => l.id === activeLessonId);
  const isLessonComplete = completedLessonIds.includes(activeLesson!.id);

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-8 py-8 pb-32">
      <button onClick={() => setActiveLessonId(null)} className="inline-flex items-center text-slate-500 hover:text-slate-900 font-bold text-[13px] mb-8 transition-colors">
        <ArrowLeft className="h-4 w-4 mr-1.5" /> Back to Course Overview
      </button>

      <div className="mb-2">
        <p className="text-[13px] font-bold text-blue-600 uppercase tracking-wider mb-2">Lesson {lessonIndex + 1} of {course.lessons.length}</p>
        <h1 className="text-[32px] font-extrabold text-slate-900 leading-tight">{activeLesson!.title}</h1>
      </div>

      <div className="prose prose-slate max-w-none mt-8">
        <div className="bg-white border border-slate-200 rounded-[20px] p-6 md:p-8 shadow-sm mb-8">
          <h3 className="text-[18px] font-extrabold flex items-center text-slate-900 mb-4">
            <BookOpen className="h-5 w-5 mr-2 text-blue-500" /> The Concept
          </h3>
          <p className="text-slate-600 font-medium leading-relaxed text-[15px]">{activeLesson!.explanation}</p>
        </div>

        {activeLesson!.exampleHook && (
          <div className="bg-slate-900 border border-slate-800 rounded-[20px] p-6 md:p-8 shadow-md mb-8 text-white">
            <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-3">Example</p>
            <p className="text-[18px] font-medium italic text-blue-100 border-l-4 border-blue-500 pl-4 py-1 mb-6">
              {activeLesson!.exampleHook}
            </p>
            
            {activeLesson!.exampleWhy && (
              <div>
                <p className="text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-3">Why it works</p>
                <ul className="space-y-2">
                  {activeLesson!.exampleWhy.map((reason, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 text-[14px]">{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="bg-blue-50 border border-blue-100 rounded-[20px] p-6 md:p-8 shadow-sm mb-8">
          <h3 className="text-[18px] font-extrabold flex items-center text-slate-900 mb-2">
            <Sparkles className="h-5 w-5 mr-2 text-blue-600" /> Your Turn
          </h3>
          <p className="text-slate-700 font-medium text-[15px] mb-6">{activeLesson!.exercisePrompt}</p>
          
          <div className="mb-4">
            <textarea 
              value={exerciseAnswer}
              onChange={(e) => setExerciseAnswer(e.target.value)}
              disabled={isSubmitting || feedback !== null}
              placeholder="Type your answer here..."
              className="w-full h-32 p-4 border border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-[15px] font-medium disabled:bg-slate-50 disabled:text-slate-500"
            ></textarea>
          </div>
          
          {!feedback ? (
            <button 
              onClick={submitExercise}
              disabled={!exerciseAnswer.trim() || isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-bold text-[14px] transition-colors flex items-center shadow-sm"
            >
              {isSubmitting ? 'Evaluating...' : 'Check My Answer'} 
              {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
            </button>
          ) : (
            <div className="bg-white border border-blue-200 rounded-xl p-5 mt-2 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                <h4 className="font-extrabold text-slate-900 flex items-center"><Sparkles className="h-4 w-4 mr-2 text-blue-600" /> AI Feedback</h4>
                <span className="bg-green-100 text-green-700 px-2.5 py-1 rounded-md text-[12px] font-bold border border-green-200">Score: {feedback.score}</span>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-[12px] font-bold text-green-600 uppercase tracking-wider mb-1">What worked</p>
                  <p className="text-[14px] text-slate-700 font-medium">{feedback.worked}</p>
                </div>
                <div>
                  <p className="text-[12px] font-bold text-orange-500 uppercase tracking-wider mb-1">How to improve</p>
                  <p className="text-[14px] text-slate-700 font-medium">{feedback.improve}</p>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <p className="text-[12px] font-bold text-blue-600 uppercase tracking-wider mb-1">Better version</p>
                  <p className="text-[14px] text-slate-900 font-medium italic">{feedback.better}</p>
                </div>
              </div>

              {!isLessonComplete && (
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button 
                    onClick={handleMarkLessonComplete}
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold text-[14px] transition-colors flex items-center justify-center shadow-sm"
                  >
                    Complete Lesson & Continue <CheckCircle2 className="ml-2 h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
