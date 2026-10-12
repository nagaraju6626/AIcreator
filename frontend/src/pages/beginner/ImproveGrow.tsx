import { TrendingUp, Target, Lightbulb, BookOpen, PenTool, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useJourney } from '../../context/JourneyContext';

export default function ImproveGrow() {
  const { updateJourney } = useJourney();
  const navigate = useNavigate();
  const actions = [
    {
      title: "Focus on stronger hooks",
      reason: "Your last test showed audience drop-off in the first 3 seconds.",
      priority: "High Priority",
      icon: Target,
      color: "blue"
    },
    {
      title: "Create more AI tutorial content",
      reason: "This aligns 92% with your selected audience of Students.",
      priority: "Medium Priority",
      icon: Lightbulb,
      color: "amber"
    },
    {
      title: "Complete Script Writing lesson",
      reason: "You are 60% done. Finishing it will improve your video retention.",
      priority: "Actionable",
      icon: BookOpen,
      color: "emerald"
    },
    {
      title: "Practice 3 more AI challenges",
      reason: "Consistent practice is required to reach the 'Create' milestone.",
      priority: "Actionable",
      icon: PenTool,
      color: "purple"
    }
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <div className="h-16 w-16 bg-blue-50 text-[#2563EB] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <TrendingUp className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold text-[#0F172A] mb-3">Improve & Grow</h1>
        <p className="text-[#64748B]">Your personalized, AI-driven growth plan based on your recent activity, learning progress, and content tests.</p>
      </div>

      <div className="bg-white rounded-3xl border border-[#E2E8F0] shadow-sm p-8 md:p-10 mb-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-[#0F172A]">Your Growth Plan</h2>
          <span className="bg-[#EFF6FF] text-[#2563EB] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Updated Today</span>
        </div>

        <div className="space-y-4">
          {actions.map((action, idx) => (
            <div key={idx} className="flex flex-col md:flex-row md:items-center bg-slate-50 border border-[#E2E8F0] rounded-2xl p-6 hover:border-[#93C5FD] hover:bg-[#EFF6FF]/50 transition-colors group">
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-4 md:mb-0 md:mr-6 flex-shrink-0 bg-white shadow-sm border border-[#E2E8F0] group-hover:border-[#2563EB] group-hover:text-[#2563EB] text-[#64748B] transition-colors`}>
                <action.icon className="h-6 w-6" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded mr-3 ${
                    action.priority.includes('High') ? 'bg-[#FEF2F2] text-[#DC2626]' :
                    action.priority.includes('Medium') ? 'bg-[#FFFBEB] text-[#F59E0B]' : 'bg-[#F0FDF4] text-[#16A34A]'
                  }`}>
                    {action.priority}
                  </span>
                  <h3 className="font-bold text-[#0F172A]">{action.title}</h3>
                </div>
                <p className="text-sm text-[#64748B]">{action.reason}</p>
              </div>
              
              <button className="mt-4 md:mt-0 ml-0 md:ml-6 flex items-center justify-center px-4 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm font-medium text-[#0F172A] hover:bg-[#2563EB] hover:text-white hover:border-[#2563EB] transition-colors shrink-0">
                Take Action <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#0F172A] rounded-3xl p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#2563EB] rounded-full blur-3xl -mr-20 -mt-20 opacity-30"></div>
        <div className="relative z-10 md:mr-8 mb-6 md:mb-0">
          <div className="flex items-center mb-3">
            <CheckCircle2 className="h-6 w-6 text-[#16A34A] mr-3" />
            <h3 className="text-xl font-bold">Ready to publish your first real video?</h3>
          </div>
          <p className="text-slate-300">You've prepared well. Don't wait for perfection. Create and learn from the results.</p>
        </div>
        <button 
          onClick={() => {
            updateJourney({ improveGrowCompleted: true });
            navigate('/beginner/journey');
          }}
          className="relative z-10 bg-white text-[#0F172A] px-8 py-3.5 rounded-xl font-bold hover:bg-slate-100 transition-colors whitespace-nowrap shadow-sm"
        >
          Mark Milestone Complete
        </button>
      </div>
    </div>
  );
}
