import { CheckCircle2, Lock, ArrowRight, Trophy } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useJourney } from '../../context/JourneyContext';

export default function MyJourney() {
  const { progress } = useJourney();
  const navigate = useNavigate();
  const { currentStep, completedCount, percentage, currentStepName } = progress;

  const getStatus = (stepNum: number) => {
    if (stepNum < currentStep) return 'completed';
    if (stepNum === currentStep) return 'current';
    return 'locked';
  };

  const steps = [
    { 
      number: 1, 
      title: 'Find Your Niche', 
      desc: 'Discover a niche that matches your skills, interests, audience, and goals.', 
      status: getStatus(1),
      completedAction: 'Review Niche →',
      currentAction: 'Start Discovering →',
      route: '/beginner/niche'
    },
    { 
      number: 2, 
      title: 'Learn Creator Skills', 
      desc: 'Master editing, writing, storytelling, and content strategy.', 
      status: getStatus(2),
      completedAction: 'Review Skills →',
      currentAction: 'Continue Learning →',
      route: '/beginner/learn'
    },
    { 
      number: 3, 
      title: 'Practice With AI', 
      desc: 'Hone your skills in a safe sandbox with real-time AI feedback.', 
      status: getStatus(3),
      completedAction: 'Review Practice →',
      currentAction: 'Start Practice →',
      route: '/beginner/practice'
    },
    { 
      number: 4, 
      title: 'Generate Content Ideas', 
      desc: 'Get personalized content ideas tailored specifically to your chosen niche.', 
      status: getStatus(4),
      completedAction: 'View Ideas →',
      currentAction: 'Generate Ideas →',
      route: '/beginner/content-ideas'
    },
    { 
      number: 5, 
      title: 'Test Content', 
      desc: 'Simulate audience reactions before you publish to the real world.', 
      status: getStatus(5),
      completedAction: 'View Results →',
      currentAction: 'Test Content →',
      route: '/beginner/test'
    },
    { 
      number: 6, 
      title: 'Improve & Grow', 
      desc: 'Analyze your performance and iterate to maximize audience growth.', 
      status: getStatus(6),
      completedAction: 'View Insights →',
      currentAction: 'Improve & Grow →',
      route: '/beginner/improve'
    },
  ];

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto pb-24">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[28px] font-extrabold text-[#0F172A] mb-2">My Journey</h1>
        <p className="text-[#64748B] text-[15px] font-medium">Follow your personalized six-step roadmap from your first idea to creator growth.</p>
      </div>

      {/* Journey Summary Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="w-full md:w-1/3">
          <p className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-1">Your Progress</p>
          <div className="flex items-end mb-2">
            <span className="text-2xl font-extrabold text-[#2563EB] leading-none mr-2">{percentage}%</span>
            <span className="text-sm font-medium text-slate-500 pb-0.5">{completedCount} of 6 completed</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#2563EB] rounded-full transition-all duration-500" style={{ width: percentage + '%' }}></div>
          </div>
        </div>

        <div className="w-full md:w-1/3 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
          <p className="text-[12px] font-bold text-slate-500 uppercase tracking-wider mb-1">Current Step</p>
          <p className="text-[16px] font-bold text-slate-900">{currentStepName}</p>
        </div>

        <div className="w-full md:w-1/3 flex md:justify-end">
          {completedCount === 6 ? (
            <Link to="/beginner/improve" className="inline-flex items-center justify-center bg-[#2563EB] text-white px-5 py-2.5 rounded-xl text-[14px] font-bold hover:bg-blue-700 transition-colors shadow-sm w-full md:w-auto">
              Explore Your Growth <ArrowRight className="ml-1.5 h-4 w-4" strokeWidth={3} />
            </Link>
          ) : (
            <Link to={steps[currentStep - 1]?.route || "#"} className="inline-flex items-center justify-center bg-[#2563EB] text-white px-5 py-2.5 rounded-xl text-[14px] font-bold hover:bg-blue-700 transition-colors shadow-sm w-full md:w-auto">
              {steps[currentStep - 1]?.currentAction}
            </Link>
          )}
        </div>
      </div>

      {completedCount === 6 && (
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-8 mb-8 text-center flex flex-col items-center shadow-sm">
          <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
            <Trophy className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 mb-2">🎉 Journey Complete!</h2>
          <p className="text-slate-600 font-medium max-w-md">You've completed your CreatorPath journey. You're now equipped with the skills and strategies to grow your audience.</p>
        </div>
      )}

      {/* Timeline */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-10">
        <div className="relative">
          {/* Vertical Line connecting steps */}
          <div className="absolute left-[27px] top-4 bottom-10 w-[3px] bg-slate-100"></div>
          
          <div className="space-y-8 relative">
            {steps.map((step, idx) => (
              <div key={idx} className="relative flex flex-col md:flex-row items-start group">
                
                {/* Circle Icon */}
                <div className={`flex-shrink-0 w-14 h-14 rounded-full border-4 flex items-center justify-center font-bold bg-white relative z-10 transition-colors
                  ${step.status === 'completed' ? 'border-[#16A34A] text-[#16A34A]' : ''}
                  ${step.status === 'current' ? 'border-[#2563EB] text-[#2563EB] shadow-md shadow-blue-100' : ''}
                  ${step.status === 'locked' ? 'border-slate-100 text-slate-400 bg-slate-50' : ''}
                `}>
                  {step.status === 'completed' ? <CheckCircle2 className="h-6 w-6" strokeWidth={2.5} /> : step.number}
                </div>
                
                {/* Card Content */}
                <div className={`mt-4 md:mt-0 md:ml-6 flex-1 flex flex-col md:flex-row items-start md:items-center justify-between p-5 md:p-6 rounded-[16px] border-[1.5px] transition-colors w-full
                  ${step.status === 'current' ? 'border-[#2563EB] bg-[#EFF6FF]' : 'border-transparent hover:bg-slate-50'}
                  ${step.status === 'locked' ? 'opacity-80' : ''}
                `}>
                  <div className="mb-4 md:mb-0 pr-4">
                    <div className="flex items-center mb-1">
                      {step.status === 'completed' && <span className="text-[#16A34A] font-bold text-[13px] mr-2 flex items-center"><CheckCircle2 className="h-3.5 w-3.5 mr-1" /> COMPLETED</span>}
                      {step.status === 'locked' && <span className="text-slate-400 font-bold text-[13px] mr-2 flex items-center"><Lock className="h-3 w-3 mr-1" /> LOCKED</span>}
                    </div>
                    <h3 className={`text-[17px] font-extrabold mb-1.5 ${
                      step.status === 'locked' ? 'text-slate-400' : 'text-slate-900'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-[14px] leading-relaxed font-medium ${
                      step.status === 'locked' ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {step.desc}
                    </p>
                  </div>
                  
                  <div className="flex-shrink-0 w-full md:w-auto">
                    {step.status === 'completed' ? (
                      <button onClick={() => navigate(step.route)} className="inline-flex items-center justify-center w-full md:w-auto px-5 py-2.5 text-[13px] font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-sm">
                        {step.completedAction}
                      </button>
                    ) : step.status === 'current' ? (
                      <button onClick={() => navigate(step.route)} className="inline-flex items-center justify-center w-full md:w-auto px-5 py-2.5 text-[13px] font-bold bg-[#2563EB] text-white rounded-xl hover:bg-blue-700 transition-colors shadow-sm">
                        {step.currentAction}
                      </button>
                    ) : (
                      <button disabled className="inline-flex items-center justify-center w-full md:w-auto px-5 py-2.5 text-[13px] font-bold text-slate-400 bg-slate-100 rounded-xl cursor-not-allowed">
                        <Lock className="h-3.5 w-3.5 mr-1.5" /> Locked
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
