import { Lightbulb, Bookmark, FileText, Zap, ChevronRight, BarChart2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useJourney } from '../../context/JourneyContext';

export default function ContentIdeas() {
  const { updateJourney } = useJourney();
  const navigate = useNavigate();
  const ideas = [
    {
      title: "The 3 AI Tools I Use to Study 2x Faster",
      hook: "If you're still reading your textbooks word for word, you're doing it wrong. Here are 3 AI tools...",
      format: "Short-form Video",
      audience: "College Students",
      difficulty: "Easy",
      potential: "High Viral Chance"
    },
    {
      title: "I Let AI Do My Homework for a Week",
      hook: "I tried relying 100% on AI to complete my assignments, and here is exactly what happened.",
      format: "Long-form Video",
      audience: "High School / College",
      difficulty: "Hard",
      potential: "High Engagement"
    },
    {
      title: "How to Build a Second Brain for Exams",
      hook: "Forget flashcards. This AI note-taking system will make you remember everything for finals.",
      format: "Carousel / Short",
      audience: "Students",
      difficulty: "Medium",
      potential: "High Save Rate"
    }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2 flex items-center">
            <Lightbulb className="h-7 w-7 text-[#F59E0B] mr-3" />
            Content Ideas
          </h1>
          <p className="text-[#64748B]">Personalized ideas generated for your "AI Tools for Students" niche.</p>
        </div>
        <button className="bg-[#2563EB] text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-sm flex items-center shrink-0">
          <Zap className="h-4 w-4 mr-2" /> Generate New Ideas
        </button>
      </div>

      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {ideas.map((idea, idx) => (
          <div key={idx} className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md hover:border-[#93C5FD] transition-all flex flex-col">
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <span className="inline-flex items-center px-2.5 py-1 bg-blue-50 text-[#2563EB] text-xs font-bold rounded-md">
                  {idea.format}
                </span>
                <button className="text-slate-400 hover:text-[#2563EB] transition-colors">
                  <Bookmark className="h-5 w-5" />
                </button>
              </div>
              
              <h3 className="text-lg font-bold text-[#0F172A] mb-4 leading-snug">{idea.title}</h3>
              
              <div className="mb-6">
                <p className="text-xs font-bold text-[#64748B] uppercase mb-1">Suggested Hook</p>
                <p className="text-sm text-[#0F172A] italic border-l-2 border-[#2563EB] pl-3 py-1 bg-slate-50">"{idea.hook}"</p>
              </div>
              
              <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-xs">
                <div>
                  <p className="text-[#94A3B8] font-semibold uppercase mb-0.5">Audience</p>
                  <p className="font-medium text-[#0F172A]">{idea.audience}</p>
                </div>
                <div>
                  <p className="text-[#94A3B8] font-semibold uppercase mb-0.5">Difficulty</p>
                  <p className={`font-medium ${idea.difficulty === 'Easy' ? 'text-[#16A34A]' : idea.difficulty === 'Medium' ? 'text-[#F59E0B]' : 'text-[#DC2626]'}`}>
                    {idea.difficulty}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-[#94A3B8] font-semibold uppercase mb-0.5">Potential</p>
                  <p className="font-medium text-[#0F172A] flex items-center">
                    <BarChart2 className="h-3 w-3 mr-1 text-[#2563EB]" /> {idea.potential}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-[#E2E8F0] p-4 bg-slate-50 rounded-b-2xl flex items-center justify-between gap-2">
              <button className="flex-1 flex items-center justify-center py-2 bg-white border border-[#E2E8F0] text-[#0F172A] text-sm font-semibold rounded-lg hover:bg-slate-100 transition-colors">
                Improve <ChevronRight className="h-4 w-4 ml-1" />
              </button>
              <button className="flex-1 flex items-center justify-center py-2 bg-[#0F172A] text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition-colors">
                <FileText className="h-4 w-4 mr-2" /> Script
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Completion Action */}
      <div className="mt-12 flex justify-center">
        <button 
          onClick={() => {
            updateJourney({ contentIdeasCompleted: true });
            navigate('/beginner/journey');
          }}
          className="bg-[#10B981] hover:bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-sm flex items-center transition-colors"
        >
          Mark Content Ideas as Complete
        </button>
      </div>
    </div>
  );
}
