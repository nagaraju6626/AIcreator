import { useState } from 'react';
import { FlaskConical, TrendingUp, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useJourney } from '../../context/JourneyContext';

export default function TestContent() {
  const { updateJourney } = useJourney();
  const navigate = useNavigate();
  const [analyzed, setAnalyzed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAnalyzed(true);
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-10 text-center max-w-2xl mx-auto">
        <div className="h-16 w-16 bg-blue-50 text-[#2563EB] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <FlaskConical className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold text-[#0F172A] mb-3">Test Your Content</h1>
        <p className="text-[#64748B]">Simulate how your content might perform or analyze a recent video to get actionable AI feedback in plain English.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        {/* Input Form */}
        <div className="md:col-span-5 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 md:p-8 h-fit">
          <h2 className="text-xl font-semibold text-[#0F172A] mb-6">Enter Metrics</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">Video Duration (seconds)</label>
              <input type="number" defaultValue="45" className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-shadow" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">Views</label>
                <input type="number" defaultValue="1250" className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-shadow" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">Likes</label>
                <input type="number" defaultValue="140" className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-shadow" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">Comments</label>
                <input type="number" defaultValue="12" className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-shadow" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">Shares</label>
                <input type="number" defaultValue="8" className="w-full bg-slate-50 border border-[#E2E8F0] rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] outline-none transition-shadow" />
              </div>
            </div>
            <button type="submit" className="w-full bg-[#2563EB] text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-sm mt-4 flex items-center justify-center">
              Analyze Performance <TrendingUp className="ml-2 h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="md:col-span-7">
          {!analyzed ? (
            <div className="h-full bg-slate-50 rounded-2xl border border-[#E2E8F0] border-dashed flex flex-col items-center justify-center p-10 text-center min-h-[400px]">
              <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4">
                <Sparkles className="h-6 w-6 text-[#94A3B8]" />
              </div>
              <p className="text-[#0F172A] font-semibold text-lg mb-2">Awaiting Data</p>
              <p className="text-[#64748B] text-sm max-w-xs">Enter your metrics on the left to receive your beginner-friendly AI analysis.</p>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-8 flex items-center justify-between">
                <div>
                  <h3 className="text-[#64748B] font-semibold uppercase tracking-wider text-xs mb-1">Performance Score</h3>
                  <p className="text-3xl font-extrabold text-[#0F172A]">Good Start <span className="text-xl text-[#64748B] font-medium ml-2">(7.4/10)</span></p>
                </div>
                <div className="h-16 w-16 rounded-full border-4 border-[#16A34A] flex items-center justify-center text-xl font-bold text-[#16A34A]">
                  74
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-[#F0FDF4] rounded-2xl border border-[#16A34A]/20 p-6">
                  <h4 className="font-semibold text-[#16A34A] flex items-center mb-3">
                    <CheckCircle2 className="h-5 w-5 mr-2" /> Strengths
                  </h4>
                  <ul className="text-sm text-[#0F172A] space-y-2">
                    <li>• Strong Like-to-View ratio (11%)</li>
                    <li>• Good engagement signal</li>
                    <li>• Audience clearly enjoyed the topic</li>
                  </ul>
                </div>
                <div className="bg-[#FEF2F2] rounded-2xl border border-[#DC2626]/20 p-6">
                  <h4 className="font-semibold text-[#DC2626] flex items-center mb-3">
                    <AlertCircle className="h-5 w-5 mr-2" /> Weaknesses
                  </h4>
                  <ul className="text-sm text-[#0F172A] space-y-2">
                    <li>• Low Share rate indicates lack of "viral" value</li>
                    <li>• Low Comments suggest the video didn't ask a strong question</li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#EFF6FF] to-white rounded-2xl border border-[#93C5FD] shadow-sm p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#3B82F6]"></div>
                <h4 className="font-semibold text-[#0F172A] mb-2 flex items-center">
                  <Sparkles className="h-5 w-5 text-[#3B82F6] mr-2" /> AI Suggestion for Next Time
                </h4>
                <p className="text-[#64748B] text-sm leading-relaxed">
                  Your viewers like your content, but they aren't interacting with it deeply. In your next video, try adding a specific Call-To-Action (CTA) at the end, such as: <strong className="text-[#0F172A]">"Which of these 3 tools is your favorite? Let me know in the comments!"</strong>
                </p>
              </div>
            </div>
          )}

          {/* Completion Action */}
          <div className="mt-8 flex justify-center">
            <button 
              onClick={() => {
                updateJourney({ testContentCompleted: true });
                navigate('/beginner/journey');
              }}
              className="bg-[#10B981] hover:bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-sm flex items-center transition-colors"
            >
              Mark Testing as Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
