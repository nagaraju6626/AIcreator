import { Link } from 'react-router-dom';
import { 
  ArrowRight, Compass, BookOpen, Sparkles, Lightbulb, 
  Check, Target, PenTool, Edit3, Video, TrendingUp, MonitorPlay
} from 'lucide-react';
import { useJourney } from '../../context/JourneyContext';

export default function BeginnerDashboard() {
  const { journey, progress } = useJourney();
  return (
    <div className="max-w-[1440px] mx-auto px-10 py-8 space-y-8 bg-white min-h-full">
      
      {/* ROW 1: Welcome Section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-[32px] font-extrabold text-slate-900 leading-tight mb-2">Welcome back, Creator! 👋</h1>
          <p className="text-[16px] text-slate-500 font-medium">Let's turn your ideas into content and your content into growth.</p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-[15px] italic font-medium text-slate-500">"Every expert was once a beginner."</p>
          <p className="text-[15px] font-medium text-slate-400 mt-1">— Keep creating!</p>
        </div>
      </div>

      {/* ROW 2: Hero Section */}
      <div className="bg-gradient-to-r from-[#D0DFFF] via-[#E6E9FF] to-[#F5E6FF] rounded-[24px] overflow-hidden relative flex flex-col md:flex-row min-h-[240px]">
        {/* Left Content */}
        <div className="p-8 md:w-1/2 z-10 flex flex-col justify-center">
          <div className="inline-flex items-center bg-white rounded-full px-3 py-1.5 shadow-sm mb-4 self-start">
            <Sparkles className="h-3.5 w-3.5 text-blue-600 mr-1.5" fill="currentColor" />
            <span className="text-[11px] font-bold text-blue-600 tracking-wider">AI RECOMMENDATION</span>
          </div>
          
          <h2 className="text-[28px] font-extrabold text-slate-900 leading-tight mb-3">
            Your next step is waiting for you 🚀
          </h2>
          
          <p className="text-[15px] text-slate-700 font-medium mb-6 max-w-sm">
            Let's discover a niche that matches your interests, skills, and goals.
          </p>
          
          <Link to="/beginner/niche" className="inline-flex items-center justify-center bg-[#2563EB] text-white px-7 h-11 rounded-[12px] text-[14px] font-bold hover:bg-blue-700 transition-colors shadow-sm self-start">
            Find My Niche <ArrowRight className="ml-2 h-4 w-4" strokeWidth={3} />
          </Link>
        </div>
        
        {/* Middle decorative text */}
        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-12 opacity-20 z-0 hidden lg:block">
          <p className="font-serif italic text-3xl text-indigo-900 leading-tight text-center" style={{ fontFamily: 'Georgia, serif' }}>
            Big <br/> Creators <br/> Start <br/> Somewhere
          </p>
        </div>
        
        {/* Right Illustration Area */}
        <div className="md:w-1/2 relative min-h-[200px] hidden md:block">
          <div className="absolute bottom-0 left-[20%] w-[280px] h-[280px] flex items-end justify-center z-10">
            <img src="/images/hero_boy.jpg" alt="Creator Boy" className="w-full h-full object-contain mix-blend-multiply" />
          </div>
          
          {/* Floating Badges */}
          <div className="absolute right-10 top-1/2 transform -translate-y-1/2 space-y-3 z-20">
            <div className="bg-white/80 backdrop-blur-sm rounded-full py-2 px-4 shadow-sm border border-white flex items-center">
              <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center mr-2">
                <Lightbulb className="h-3 w-3 text-orange-500" />
              </div>
              <span className="text-[13px] font-bold text-slate-700">Ideas</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-full py-2 px-4 shadow-sm border border-white flex items-center transform -translate-x-4">
              <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mr-2">
                <BookOpen className="h-3 w-3 text-purple-600" />
              </div>
              <span className="text-[13px] font-bold text-slate-700">Skills</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-full py-2 px-4 shadow-sm border border-white flex items-center transform -translate-x-2">
              <div className="h-6 w-6 rounded-full bg-pink-100 flex items-center justify-center mr-2">
                <Video className="h-3 w-3 text-pink-500" />
              </div>
              <span className="text-[13px] font-bold text-slate-700">Content</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-full py-2 px-4 shadow-sm border border-white flex items-center transform translate-x-2">
              <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                <TrendingUp className="h-3 w-3 text-blue-500" />
              </div>
              <span className="text-[13px] font-bold text-slate-700">Growth</span>
            </div>
          </div>
        </div>
      </div>

      {/* ROW 3: Progress and Profile */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Progress Card */}
        <div className="lg:col-span-7 xl:col-span-8 bg-white border border-slate-100 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.04)] p-6 flex flex-col justify-between min-h-[220px]">
          <div>
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-[18px] font-extrabold text-slate-900">Your Creator Progress</h3>
              <Link to="/beginner/journey" className="inline-flex items-center bg-[#EFF6FF] text-[#2563EB] px-4 py-2 rounded-xl text-[13px] font-bold hover:bg-blue-100 transition-colors">
                View Full Journey <ArrowRight className="ml-1.5 h-3.5 w-3.5" strokeWidth={2.5} />
              </Link>
            </div>
            
            <div className="flex justify-between items-end mb-3">
              <p className="text-[14px] text-slate-500 font-medium">{progress.completedCount} of 6 milestones completed</p>
              <span className="text-[24px] font-extrabold text-blue-600 leading-none">{progress.percentage}%</span>
            </div>
            
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-6">
              <div className="h-full bg-blue-600 rounded-full transition-all duration-500" style={{ width: progress.percentage + '%' }}></div>
            </div>
          </div>
          
          <div className="relative flex justify-between px-2 mt-auto">
            <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-100 -z-10"></div>
            
            {[
              { num: '1', name: 'Niche', status: progress.currentStep > 1 || progress.completedCount === 6 ? 'completed' : progress.currentStep === 1 ? 'current' : 'upcoming' },
              { num: '2', name: 'Learn', status: progress.currentStep > 2 || progress.completedCount === 6 ? 'completed' : progress.currentStep === 2 ? 'current' : 'upcoming' },
              { num: '3', name: 'Practice', status: progress.currentStep > 3 || progress.completedCount === 6 ? 'completed' : progress.currentStep === 3 ? 'current' : 'upcoming' },
              { num: '4', name: 'Create', status: progress.currentStep > 4 || progress.completedCount === 6 ? 'completed' : progress.currentStep === 4 ? 'current' : 'upcoming' },
              { num: '5', name: 'Test', status: progress.currentStep > 5 || progress.completedCount === 6 ? 'completed' : progress.currentStep === 5 ? 'current' : 'upcoming' },
              { num: '6', name: 'Grow', status: progress.completedCount === 6 ? 'completed' : progress.currentStep === 6 ? 'current' : 'upcoming' }
            ].map((step, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className={
                  "h-9 w-9 rounded-full flex items-center justify-center mb-3 z-10 text-[14px] font-bold " +
                  (step.status === 'completed' ? 'bg-[#10B981] text-white shadow-sm border-2 border-transparent' : 
                   step.status === 'current' ? 'bg-white text-[#2563EB] border-2 border-[#2563EB] shadow-sm' : 
                   'bg-white text-slate-400 border-2 border-slate-100 shadow-sm')
                }>
                  {step.status === 'completed' ? <Check className="h-5 w-5" strokeWidth={3} /> : step.num}
                </div>
                <span className={"text-[13px] font-bold " + (step.status === 'completed' ? 'text-[#10B981]' : step.status === 'current' ? 'text-[#2563EB]' : 'text-slate-400')}>
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Profile Card */}
        <div className="lg:col-span-5 xl:col-span-4 bg-white border border-slate-100 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.04)] p-6 flex flex-col justify-between min-h-[220px]">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-[18px] font-extrabold text-slate-900">Your Creator Profile</h3>
            <button className="inline-flex items-center text-blue-600 text-[13px] font-bold hover:text-blue-700">
              <Edit3 className="h-3.5 w-3.5 mr-1" strokeWidth={2.5} /> Edit
            </button>
          </div>
          
          <div className="flex items-start mt-auto">
            {/* Target Illustration */}
            <div className="w-[72px] h-[72px] bg-slate-50 rounded-full border border-slate-100 flex items-center justify-center mr-5 flex-shrink-0 relative">
              <Target className="h-8 w-8 text-indigo-500" strokeWidth={1.5} />
              <div className="absolute bottom-1 right-1 h-5 w-5 bg-white rounded-full shadow border border-slate-100 flex items-center justify-center">
                <div className="h-2.5 w-2.5 bg-blue-500 rounded-full"></div>
              </div>
            </div>
            
            <div className="flex-1">
              <p className="text-[12px] font-bold text-slate-500 mb-0.5">Creator Type</p>
              <p className="text-[16px] font-extrabold text-slate-900 mb-3 flex items-center">
                🌱 Beginner Creator
              </p>
              
              {journey.selectedNiche ? (
                <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-100">
                  <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider mb-1">Selected Niche</p>
                  <p className="text-[14px] font-extrabold text-slate-900 mb-1">{journey.selectedNiche}</p>
                </div>
              ) : (
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <p className="text-[12px] text-slate-600 font-medium mb-3 leading-snug">
                    Your niche hasn't been selected yet. Discover a niche to personalize your journey.
                  </p>
                  <Link to="/beginner/niche" className="inline-flex items-center justify-center bg-[#2563EB] text-white w-full py-2.5 rounded-[12px] text-[13px] font-bold hover:bg-blue-700 transition-colors shadow-sm">
                    Discover My Niche <ArrowRight className="ml-1.5 h-3.5 w-3.5" strokeWidth={3} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
        
      </div>

      {/* ROW 4: Quick Actions */}
      <div>
        <div className="flex items-baseline mb-4">
          <h3 className="text-[18px] font-extrabold text-slate-900 mr-2">Quick Actions</h3>
          <p className="text-[14px] text-slate-500 font-medium">Jump into the tools and resources you need.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1 */}
          <div className="bg-[#F0F7FF] rounded-[20px] p-4 flex items-start border border-blue-100/50 hover:shadow-md transition-shadow cursor-pointer">
            <div className="h-[48px] w-[48px] rounded-full flex items-center justify-center flex-shrink-0 mr-4 overflow-hidden border-2 border-white shadow-sm bg-white">
              <img src="/images/target_icon.jpg" alt="Target" className="w-full h-full object-cover mix-blend-multiply" />
            </div>
            <div>
              <h4 className="font-extrabold text-[14px] text-blue-800 mb-0.5">Find Your Niche</h4>
              <p className="text-[12px] text-blue-900/60 font-medium mb-2 leading-snug">Discover a niche that matches you.</p>
              <Link to="/beginner/niche" className="inline-flex items-center text-[12px] font-bold text-blue-700">
                Open <ArrowRight className="ml-1 h-3 w-3" strokeWidth={3} />
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#FAF5FF] rounded-[20px] p-4 flex items-start border border-purple-100/50 hover:shadow-md transition-shadow cursor-pointer">
            <div className="h-[48px] w-[48px] rounded-full flex items-center justify-center flex-shrink-0 mr-4 overflow-hidden border-2 border-white shadow-sm bg-white">
              <img src="/images/books_icon.jpg" alt="Learn Skills" className="w-full h-full object-cover mix-blend-multiply" />
            </div>
            <div>
              <h4 className="font-extrabold text-[14px] text-purple-800 mb-0.5">Learn Skills</h4>
              <p className="text-[12px] text-purple-900/60 font-medium mb-2 leading-snug">Build the skills you need to create.</p>
              <Link to="/beginner/learn" className="inline-flex items-center text-[12px] font-bold text-purple-700">
                Continue <ArrowRight className="ml-1 h-3 w-3" strokeWidth={3} />
              </Link>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#ECFDF5] rounded-[20px] p-4 flex items-start border border-emerald-100/50 hover:shadow-md transition-shadow cursor-pointer">
            <div className="h-[48px] w-[48px] rounded-full flex items-center justify-center flex-shrink-0 mr-4 overflow-hidden border-2 border-white shadow-sm bg-white">
              <img src="/images/bot_icon.jpg" alt="Practice with AI" className="w-full h-full object-cover mix-blend-multiply" />
            </div>
            <div>
              <h4 className="font-extrabold text-[14px] text-emerald-800 mb-0.5">Practice With AI</h4>
              <p className="text-[12px] text-emerald-900/60 font-medium mb-2 leading-snug">Improve your skills with AI feedback.</p>
              <Link to="/beginner/practice" className="inline-flex items-center text-[12px] font-bold text-emerald-700">
                Practice <ArrowRight className="ml-1 h-3 w-3" strokeWidth={3} />
              </Link>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-[#FFFBEB] rounded-[20px] p-4 flex items-start border border-amber-100/50 hover:shadow-md transition-shadow cursor-pointer">
            <div className="h-[48px] w-[48px] rounded-full flex items-center justify-center flex-shrink-0 mr-4 overflow-hidden border-2 border-white shadow-sm bg-white">
              <img src="/images/bulb_icon.jpg" alt="Get Content Ideas" className="w-full h-full object-cover mix-blend-multiply" />
            </div>
            <div>
              <h4 className="font-extrabold text-[14px] text-amber-800 mb-0.5">Get Content Ideas</h4>
              <p className="text-[12px] text-amber-900/60 font-medium mb-2 leading-snug">Generate ideas based on your niche.</p>
              <Link to="/beginner/content-ideas" className="inline-flex items-center text-[12px] font-bold text-amber-700">
                Explore <ArrowRight className="ml-1 h-3 w-3" strokeWidth={3} />
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* ROW 5: Bottom widgets */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Insight Card */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#E0F2FE] to-[#F0FDF4] rounded-[20px] p-6 relative overflow-hidden flex flex-col justify-between">
          <div className="relative z-10 w-[70%]">
            <div className="flex items-center mb-4">
              <div className="bg-white rounded-full p-1.5 shadow-sm mr-2 text-cyan-500">
                <Sparkles className="h-4 w-4" />
              </div>
              <h3 className="font-extrabold text-[15px] text-slate-800">CreatorPath AI Insight</h3>
            </div>
            <h4 className="text-[18px] font-extrabold text-slate-900 mb-3 leading-tight">You are at the beginning of an exciting journey!</h4>
            <p className="text-[13px] font-medium text-slate-700 mb-6 leading-relaxed">
              Based on trending topics and your interests, educational content and AI tools could be a great niche for you. Start with simple, value-packed content and stay consistent.
            </p>
            <Link to="/beginner/niche" className="inline-flex items-center justify-center bg-[#2563EB] text-white px-5 py-2.5 rounded-[12px] text-[13px] font-bold hover:bg-blue-700 transition-colors shadow-sm w-max">
              Explore Niche Ideas <ArrowRight className="ml-1.5 h-3.5 w-3.5" strokeWidth={3} />
            </Link>
          </div>
          <div className="absolute right-0 bottom-[-10px] opacity-100 flex flex-col items-end">
            <div className="text-right -mb-6 mr-6 relative z-10">
              <span className="font-serif italic text-cyan-700 font-bold rotate-[-10deg] inline-block text-sm">You <br/> Got This!</span>
            </div>
            <div className="w-[140px] h-[140px]">
              <img src="/images/insight_robot.jpg" alt="AI Robot" className="w-full h-full object-contain mix-blend-multiply" />
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-4 bg-white border border-slate-100 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.04)] p-6">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-[16px] font-extrabold text-slate-900">Recent Activity</h3>
            <button className="text-[13px] font-bold text-blue-600 hover:text-blue-700">See all</button>
          </div>
          
          <div className="relative border-l-2 border-slate-100 ml-2.5 space-y-5 pb-1">
            
            <div className="relative pl-6">
              <div className="absolute -left-[11px] top-0 bg-white h-5 w-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                <div className="bg-[#10B981] h-5 w-5 rounded-full flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" strokeWidth={3} />
                </div>
              </div>
              <p className="text-[14px] font-extrabold text-slate-800 leading-tight">Joined CreatorPath AI</p>
              <p className="text-[12px] font-medium text-slate-400">Today</p>
            </div>

            <div className="relative pl-6">
              <div className="absolute -left-[11px] top-0 bg-white h-5 w-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                <div className="bg-blue-100 h-5 w-5 rounded-full flex items-center justify-center">
                  <Lightbulb className="h-3 w-3 text-blue-600" />
                </div>
              </div>
              <p className="text-[14px] font-extrabold text-slate-800 leading-tight">Explored AI content ideas</p>
              <p className="text-[12px] font-medium text-slate-400">Yesterday</p>
            </div>
            
            <div className="relative pl-6">
              <div className="absolute -left-[11px] top-0 bg-white h-5 w-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                <div className="bg-purple-100 h-5 w-5 rounded-full flex items-center justify-center">
                  <MonitorPlay className="h-3 w-3 text-purple-600" />
                </div>
              </div>
              <p className="text-[14px] font-extrabold text-slate-800 leading-tight">Viewed learning resources</p>
              <p className="text-[12px] font-medium text-slate-400">2 days ago</p>
            </div>
            
            <div className="relative pl-6 opacity-50">
              <div className="absolute -left-[9px] top-1 bg-white h-4 w-4 rounded-full flex items-center justify-center border-2 border-slate-300">
              </div>
              <p className="text-[14px] font-extrabold text-slate-500 leading-tight">Start your niche journey</p>
              <p className="text-[12px] font-medium text-slate-400">Your next step</p>
            </div>

          </div>
        </div>

        {/* Creator Tip */}
        <div className="lg:col-span-3 bg-white border border-slate-100 rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.04)] p-6 flex flex-col relative overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center mr-2">
                <Target className="h-3.5 w-3.5 text-red-500" />
              </div>
              <h3 className="text-[15px] font-extrabold text-slate-900">Creator Tip</h3>
            </div>
            <div className="bg-orange-50 text-orange-600 text-[11px] font-bold px-2 py-0.5 rounded-md">
              Today's Tip
            </div>
          </div>
          
          <p className="text-[14px] font-bold text-slate-700 italic leading-snug z-10 mb-6">
            "Focus on helping one specific audience before trying to reach everyone."
          </p>
          
          <div className="mt-auto flex justify-between items-end relative z-10">
            <p className="text-[11px] font-bold text-slate-400">Small steps. Big results. 🌿</p>
          </div>
          
          {/* Decorative soil/plant icon representing growth */}
          <div className="absolute right-0 bottom-[-10px] w-20 h-20 opacity-90">
            <img src="/images/plant_icon.jpg" alt="Growth" className="w-full h-full object-contain mix-blend-multiply" />
          </div>
        </div>

      </div>
    </div>
  );
}
