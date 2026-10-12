import { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle, CheckCircle2, PlayCircle, Lock, Clock, MonitorPlay, ExternalLink, RefreshCw } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useJourney } from '../../context/JourneyContext';
import { COURSES, CATEGORIES } from '../../data/courses';

export default function Learn() {
  const { journey } = useJourney();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [youtubeVideos, setYoutubeVideos] = useState<any[]>([]);
  const [isLoadingVideos, setIsLoadingVideos] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);

  const { selectedNiche, courseProgress = {} } = journey;

  const [retryCount, setRetryCount] = useState(0);

  // Fetch YouTube recommendations
  useEffect(() => {
    async function fetchVideos() {
      if (!selectedNiche) return;
      
      setIsLoadingVideos(true);
      setVideoError(null);
      try {
        const response = await fetch('http://localhost:8000/api/v1/youtube/recommendations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            niche: selectedNiche,
            interests: journey.interests || [],
            skills: journey.skills || [],
            audience: journey.audience || [],
            platform: journey.platform || [],
            content_type: journey.contentType || [],
            goal: journey.goal || []
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
  }, [selectedNiche, retryCount]);

  // Filter courses based on category
  let filteredCourses = COURSES;
  if (selectedCategory !== 'all') {
    filteredCourses = COURSES.filter(c => c.category === selectedCategory);
  }

  // Personalization: Score courses based on journey profile
  const calculateRelevance = (course: any) => {
    let score = 0;
    if (selectedNiche && course.niches?.includes(selectedNiche)) score += 30;
    if (journey.skills && journey.skills.some((s: string) => course.skills?.includes(s))) score += 20;
    if (journey.audience && journey.audience.some((a: string) => course.audiences?.includes(a))) score += 15;
    if (journey.platform && journey.platform.some((p: string) => course.platforms?.includes(p))) score += 15;
    if (journey.contentType && journey.contentType.some((c: string) => course.content_types?.includes(c))) score += 10;
    if (journey.goal && journey.goal.some((g: string) => course.goals?.includes(g))) score += 10;
    
    // Baseline for universal skills if score is 0
    if (score === 0 && ['script_writing', 'thumbnail_design', 'analytics', 'audience_growth'].includes(course.category)) {
      score = 5;
    }
    return score;
  };

  const scoredCourses = COURSES.map(c => ({ ...c, score: calculateRelevance(c) }));
  
  // Display top 3 recommended courses based on score
  const displayRecommendations = [...scoredCourses].sort((a, b) => b.score - a.score).slice(0, 3);
  
  // Also sort the filtered courses in the "Browse" section so highest relevance is first
  filteredCourses = [...filteredCourses].map(c => ({ ...c, score: calculateRelevance(c) })).sort((a, b) => b.score - a.score);

  // Calculate learning progress stats
  const totalCourses = COURSES.length;
  const startedOrCompletedCourses = COURSES.filter(c => (courseProgress[c.id]?.length || 0) > 0);
  const completedCourses = COURSES.filter(c => (courseProgress[c.id]?.length || 0) === c.lessons.length);
  
  const totalLessons = COURSES.reduce((sum, c) => sum + c.lessons.length, 0);
  const completedLessons = Object.values(courseProgress).reduce((sum, arr) => sum + arr.length, 0);
  const progressPercentage = totalLessons === 0 ? 0 : Math.round((completedLessons / totalLessons) * 100);

  // Continue learning: Find the most recently interacted course that is not fully completed
  const continueCourse = startedOrCompletedCourses.find(c => (courseProgress[c.id]?.length || 0) > 0 && (courseProgress[c.id]?.length || 0) < c.lessons.length);

  if (!selectedNiche) {
    return (
      <div className="p-8 max-w-4xl mx-auto h-[calc(100vh-64px)] flex flex-col justify-center items-center">
        <Target className="h-16 w-16 text-slate-300 mb-6" />
        <h2 className="text-2xl font-bold text-slate-900 mb-3 text-center">Complete Find My Niche to unlock your personalized learning path.</h2>
        <p className="text-slate-500 mb-8 text-center max-w-md">Your creator academy will automatically adapt its courses and YouTube recommendations based on your unique goals.</p>
        <button 
          onClick={() => navigate('/beginner/niche')}
          className="bg-[#2563EB] hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold flex items-center shadow-lg transition-transform hover:scale-105"
        >
          Find My Niche <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-24">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[28px] font-extrabold text-slate-900 mb-2">Creator Academy</h1>
        <p className="text-slate-500 text-[15px] font-medium max-w-2xl">
          Build the skills you need to create better content, grow your audience, and turn ideas into impact.
        </p>
      </div>

      {/* Progress Summary Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="w-full md:w-1/2">
          <p className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-2">Your Learning Progress</p>
          <div className="flex items-end mb-3">
            <span className="text-[28px] font-extrabold text-[#2563EB] leading-none mr-3">{progressPercentage}%</span>
            <span className="text-[14px] font-medium text-slate-500 pb-1">{completedLessons} of {totalLessons} lessons completed</span>
          </div>
          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#2563EB] rounded-full transition-all duration-500" style={{ width: progressPercentage + '%' }}></div>
          </div>
        </div>

        <div className="w-full md:w-1/2 border-t md:border-t-0 md:border-l border-slate-100 pt-5 md:pt-0 md:pl-8 flex flex-col justify-center">
          {continueCourse ? (
            <>
              <p className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-1">Current Course</p>
              <h3 className="text-[16px] font-extrabold text-slate-900 mb-3 truncate">{continueCourse.title}</h3>
              <Link to={"/beginner/learn/course/" + continueCourse.id} className="inline-flex items-center justify-center bg-[#2563EB] text-white px-5 py-2.5 rounded-xl text-[14px] font-bold hover:bg-blue-700 transition-colors shadow-sm w-fit">
                Continue Learning <ArrowRight className="ml-1.5 h-4 w-4" strokeWidth={2.5} />
              </Link>
            </>
          ) : (
            <>
              <p className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-1">Start Your Journey</p>
              <h3 className="text-[16px] font-extrabold text-slate-900 mb-3 truncate">Ready to learn creator skills?</h3>
              <a href="#courses" className="inline-flex items-center justify-center bg-[#2563EB] text-white px-5 py-2.5 rounded-xl text-[14px] font-bold hover:bg-blue-700 transition-colors shadow-sm w-fit">
                Explore Courses <ArrowRight className="ml-1.5 h-4 w-4" strokeWidth={2.5} />
              </a>
            </>
          )}
        </div>
      </div>

      {/* Recommended Section */}
      <div className="mb-12">
        <h2 className="text-[20px] font-extrabold text-slate-900 mb-2">Recommended for You</h2>
        
        {!selectedNiche ? (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-6 flex items-center justify-between shadow-sm">
            <div>
              <h3 className="text-[16px] font-bold text-slate-900 mb-1">Discover your niche first to unlock personalized learning recommendations.</h3>
              <p className="text-[14px] text-slate-600">Your recommendations will be tailored to your specific audience and topic.</p>
            </div>
            <Link to="/beginner/niche" className="whitespace-nowrap inline-flex items-center bg-white text-[#2563EB] border border-[#93C5FD] px-5 py-2.5 rounded-xl text-[14px] font-bold hover:bg-blue-50 transition-colors shadow-sm ml-4">
              Find My Niche <ArrowRight className="ml-1.5 h-4 w-4" strokeWidth={2.5} />
            </Link>
          </div>
        ) : (
          <>
            <p className="text-slate-500 text-[14px] font-medium mb-6">Because you're interested in {selectedNiche}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {displayRecommendations.map(course => (
                <CourseCard key={course.id} course={course} progress={courseProgress[course.id]?.length || 0} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* YouTube Recommendations Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[20px] font-extrabold text-slate-900 flex items-center">
            <MonitorPlay className="h-6 w-6 text-red-500 mr-2" /> Recommended YouTube Videos
          </h2>
          {selectedNiche && (
            <button 
              onClick={() => {
                setYoutubeVideos([]);
                setRetryCount(c => c + 1);
              }}
              disabled={isLoadingVideos}
              className="flex items-center bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 mr-1.5 ${isLoadingVideos ? 'animate-spin' : ''}`} /> 
              {isLoadingVideos ? 'Finding fresh videos...' : 'Refresh Recommendations'}
            </button>
          )}
        </div>
        
        {!selectedNiche ? (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex items-center justify-between shadow-sm">
             <p className="text-[14px] text-slate-600 font-medium">Discover your niche to unlock personalized YouTube videos.</p>
          </div>
        ) : videoError ? (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
             <p className="text-[14px] text-red-600 font-medium mb-3">{videoError}</p>
             <button onClick={() => setRetryCount(c => c + 1)} className="bg-white border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-50">Try Again</button>
          </div>
        ) : isLoadingVideos ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {youtubeVideos.map(video => (
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

      {/* Categories */}
      <div className="mb-8" id="courses">
        <h2 className="text-[20px] font-extrabold text-slate-900 mb-4">Browse Categories</h2>
        <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={
                  "flex items-center px-4 py-2.5 rounded-xl border whitespace-nowrap transition-all " +
                  (isSelected ? 'bg-slate-900 border-slate-900 text-white shadow-md' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50')
                }
              >
                <Icon className={"h-4 w-4 mr-2 " + (isSelected ? 'text-white' : 'text-slate-400')} />
                <span className="text-[14px] font-bold">{cat.title}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredCourses.map(course => (
          <CourseCard key={course.id} course={course} progress={courseProgress[course.id]?.length || 0} />
        ))}
      </div>

    </div>
  );
}

function CourseCard({ course, progress }: { course: typeof COURSES[0], progress: number }) {
  const Icon = course.icon;
  const isCompleted = progress === course.lessons.length;
  const isStarted = progress > 0;
  const progressPercent = Math.round((progress / course.lessons.length) * 100);

  return (
<Link to={"/beginner/learn/course/" + course.id} className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-lg hover:border-blue-200 transition-all flex flex-col h-full group">
      <div className="flex items-start justify-between mb-4">
        <div className="h-12 w-12 rounded-[14px] bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] group-hover:scale-110 transition-transform">
          <Icon className="h-6 w-6" strokeWidth={2} />
        </div>
        {isCompleted && (
          <div className="bg-[#F0FDF4] text-[#16A34A] px-2.5 py-1 rounded-md text-[11px] font-bold flex items-center border border-green-100">
            <CheckCircle2 className="h-3 w-3 mr-1" strokeWidth={3} /> COMPLETED
          </div>
        )}
      </div>

      <div className="mb-2">
        <p className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider mb-1">{course.categoryName}</p>
        <h3 className="text-[17px] font-extrabold text-slate-900 leading-tight mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-[14px] text-slate-500 line-clamp-2 font-medium">{course.description}</p>
      </div>

      <div className="mt-auto pt-5">
        <div className="flex items-center text-[12px] font-bold text-slate-400 mb-4">
          <span className="bg-slate-50 px-2 py-1 rounded border border-slate-100">{course.level}</span>
          <span className="mx-2">•</span>
          <span className="flex items-center"><Clock className="h-3 w-3 mr-1" /> {course.duration}</span>
          <span className="mx-2">•</span>
          <span>{course.lessons.length} Lessons</span>
        </div>

        {isStarted && !isCompleted ? (
          <div>
            <div className="flex justify-between items-end mb-1.5">
              <span className="text-[12px] font-bold text-slate-700">Progress</span>
              <span className="text-[12px] font-bold text-[#2563EB]">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-4">
              <div className="h-full bg-[#2563EB] rounded-full" style={{ width: progressPercent + '%' }}></div>
            </div>
            <button className="w-full bg-white border border-slate-200 text-slate-700 font-bold text-[13px] py-2.5 rounded-xl group-hover:bg-[#2563EB] group-hover:text-white group-hover:border-[#2563EB] transition-colors">
              Continue Lesson →
            </button>
          </div>
        ) : isCompleted ? (
          <button className="w-full bg-white border border-slate-200 text-slate-600 font-bold text-[13px] py-2.5 rounded-xl hover:bg-slate-50 transition-colors">
            Review Course →
          </button>
        ) : (
          <button className="w-full bg-white border border-[#2563EB] text-[#2563EB] font-bold text-[13px] py-2.5 rounded-xl group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
            Start Course →
          </button>
        )}
      </div>
    </Link>
  );
}
