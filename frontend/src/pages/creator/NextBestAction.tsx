import { useState } from 'react';
import { Target, Zap, TrendingUp, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

export default function NextBestAction() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <div className="inline-flex items-center text-sm font-bold text-[#06B6D4] uppercase tracking-wider mb-2">
            <Sparkles className="h-4 w-4 mr-2" /> CreatorPath Engine
          </div>
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Next Best Action</h1>
          <p className="text-[#64748B] max-w-2xl">
            The AI has analyzed your analytics, audience sentiment, and viral patterns to determine the single most impactful action you should take right now.
          </p>
        </div>
        <button 
          onClick={() => {
            setLoading(true);
            setTimeout(() => setLoading(false), 2000);
          }}
          className="bg-white border border-[#E2E8F0] text-[#0F172A] px-4 py-2 rounded-xl font-medium hover:bg-slate-50 transition-colors flex items-center shadow-sm"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Recalculate
        </button>
      </div>

      {loading ? (
        <div className="h-[400px] bg-white rounded-3xl border border-[#E2E8F0] shadow-sm flex flex-col items-center justify-center space-y-4">
          <RefreshCw className="h-10 w-10 text-[#2563EB] animate-spin" />
          <p className="text-[#0F172A] font-semibold text-lg">Running intelligence engine...</p>
          <p className="text-[#64748B]">Synthesizing 2.4k data points</p>
        </div>
      ) : (
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Action Card */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-3xl p-1 relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#2563EB] rounded-full blur-[100px] -mr-40 -mt-40 opacity-20 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#06B6D4] rounded-full blur-[80px] -ml-20 -mb-20 opacity-20 pointer-events-none"></div>
              
              <div className="bg-[#0F172A]/80 backdrop-blur-xl rounded-[22px] p-8 md:p-12 relative z-10 border border-white/10">
                <div className="inline-flex items-center bg-[#2563EB] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                  Priority 1
                </div>
                
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
                  Create a short-form video about "Top 5 AI Tools for Productivity"
                </h2>
                
                <p className="text-slate-300 text-lg mb-8 leading-relaxed max-w-2xl">
                  Your audience is actively searching for productivity hacks. Your last video on a similar topic had a 45% higher retention rate than your average. Capitalize on this momentum before the trend cools down.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-[#2563EB] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-blue-600 transition-colors flex items-center justify-center">
                    <Zap className="h-5 w-5 mr-2" /> Start Drafting Script
                  </button>
                  <button className="bg-white/10 text-white border border-white/20 px-8 py-3.5 rounded-xl font-bold hover:bg-white/20 transition-colors flex items-center justify-center">
                    Add to Backlog
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-8">
              <h3 className="text-xl font-bold text-[#0F172A] mb-6">Why this was recommended</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                  <TrendingUp className="h-6 w-6 text-[#16A34A] mb-3" />
                  <h4 className="font-bold text-[#0F172A] mb-1">Viral Pattern Match</h4>
                  <p className="text-sm text-[#64748B]">Matches 3 factors from your most successful video.</p>
                </div>
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                  <Target className="h-6 w-6 text-[#2563EB] mb-3" />
                  <h4 className="font-bold text-[#0F172A] mb-1">Audience Request</h4>
                  <p className="text-sm text-[#64748B]">Mentioned in 24 comments over the last week.</p>
                </div>
                <div className="p-5 bg-slate-50 rounded-xl border border-slate-100">
                  <AlertCircle className="h-6 w-6 text-[#F59E0B] mb-3" />
                  <h4 className="font-bold text-[#0F172A] mb-1">Low Competition</h4>
                  <p className="text-sm text-[#64748B]">Currently high search volume with low creator supply.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Side Pipeline */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-bold text-[#0F172A] mb-6">Up Next in Queue</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-white border border-[#E2E8F0] rounded-xl hover:border-[#2563EB] transition-colors cursor-pointer group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] group-hover:text-[#2563EB]">Priority 2</span>
                    <span className="text-[#16A34A] text-xs font-bold">+85% Impact</span>
                  </div>
                  <h4 className="font-semibold text-[#0F172A] text-sm">Host a Q&A livestream</h4>
                </div>

                <div className="p-4 bg-white border border-[#E2E8F0] rounded-xl hover:border-[#2563EB] transition-colors cursor-pointer group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] group-hover:text-[#2563EB]">Priority 3</span>
                    <span className="text-[#16A34A] text-xs font-bold">+72% Impact</span>
                  </div>
                  <h4 className="font-semibold text-[#0F172A] text-sm">Update thumbnail on "My Journey" video</h4>
                </div>
                
                <div className="p-4 bg-white border border-[#E2E8F0] rounded-xl hover:border-[#2563EB] transition-colors cursor-pointer group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] group-hover:text-[#2563EB]">Priority 4</span>
                    <span className="text-[#16A34A] text-xs font-bold">+60% Impact</span>
                  </div>
                  <h4 className="font-semibold text-[#0F172A] text-sm">Post a community poll</h4>
                </div>
              </div>

              <button className="w-full mt-6 text-[#2563EB] font-bold text-sm hover:text-blue-800 transition-colors">
                View Full Strategy Backlog →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
