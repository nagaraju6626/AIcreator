import { useState } from 'react';
import { Target, CheckCircle2, AlertTriangle, Sparkles, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useJourney } from '../../context/JourneyContext';

export default function Practice() {
  const { updateJourney } = useJourney();
  const navigate = useNavigate();
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2 flex items-center">
          <Sparkles className="h-6 w-6 text-[#06B6D4] mr-3" />
          AI Practice Workspace
        </h1>
        <p className="text-[#64748B]">Hone your creator skills with real-time AI feedback.</p>
      </div>

      {!submitted ? (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
          <div className="bg-[#0F172A] px-8 py-6 text-white flex items-center justify-between">
            <div>
              <span className="text-[#3B82F6] font-bold text-xs uppercase tracking-wider block mb-1">Today's Challenge</span>
              <h2 className="text-xl font-semibold">Write a strong 3-second hook for a video about "Top 5 AI Tools for Students".</h2>
            </div>
            <Target className="h-10 w-10 text-white/20" />
          </div>
          
          <form onSubmit={handleSubmit} className="p-8">
            <p className="text-sm font-semibold text-[#0F172A] mb-3">Your Answer</p>
            <textarea
              className="w-full h-32 p-4 bg-slate-50 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-shadow resize-none mb-6"
              placeholder="Type your hook here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            ></textarea>
            
            <div className="flex justify-end">
              <button 
                type="submit"
                disabled={!answer.trim()}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  answer.trim() 
                    ? 'bg-[#2563EB] text-white hover:bg-blue-700 shadow-sm' 
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                }`}
              >
                Submit for Evaluation
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#06B6D4] shadow-sm p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#06B6D4]"></div>
            
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-[#0F172A] flex items-center">
                <Sparkles className="h-6 w-6 text-[#06B6D4] mr-2" /> AI Evaluation
              </h2>
              <div className="text-right">
                <p className="text-sm font-bold text-[#64748B] uppercase tracking-wider mb-1">Score</p>
                <div className="text-3xl font-extrabold text-[#16A34A]">82<span className="text-lg text-slate-400">/100</span></div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="font-semibold text-[#0F172A] flex items-center mb-4">
                  <CheckCircle2 className="h-5 w-5 text-[#16A34A] mr-2" /> Strengths
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start text-[#64748B] text-sm">
                    <span className="text-[#16A34A] mr-2">✓</span> Clear identification of the target audience (students).
                  </li>
                  <li className="flex items-start text-[#64748B] text-sm">
                    <span className="text-[#16A34A] mr-2">✓</span> Good sense of urgency.
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-[#0F172A] flex items-center mb-4">
                  <AlertTriangle className="h-5 w-5 text-[#F59E0B] mr-2" /> Areas to Improve
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start text-[#64748B] text-sm">
                    <span className="text-[#F59E0B] mr-2">•</span> Make the first 3 seconds more specific about the outcome.
                  </li>
                  <li className="flex items-start text-[#64748B] text-sm">
                    <span className="text-[#F59E0B] mr-2">•</span> Avoid generic phrasing like "in this video".
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-6 mb-8">
              <p className="text-xs font-bold text-[#2563EB] uppercase tracking-wider mb-2">Better Version</p>
              <p className="font-medium text-[#0F172A] italic">
                "Stop wasting hours taking notes. These 5 free AI tools will cut your study time in half today."
              </p>
            </div>

            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => { setAnswer(''); setSubmitted(false); }}
                className="flex items-center text-[#2563EB] font-semibold px-6 py-3 border-2 border-[#2563EB] rounded-xl hover:bg-[#EFF6FF] transition-colors"
              >
                <RefreshCw className="h-5 w-5 mr-2" /> Try Again
              </button>
              <button 
                onClick={() => {
                  updateJourney({ practiceCompleted: true });
                  navigate('/beginner/journey');
                }}
                className="flex items-center text-white bg-[#10B981] font-semibold px-6 py-3 border-2 border-[#10B981] rounded-xl hover:bg-emerald-600 transition-colors shadow-sm"
              >
                Mark Practice as Complete <CheckCircle2 className="h-5 w-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
