import { BarChart, TrendingUp, Users, Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CreatorDashboard() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Creator Dashboard</h1>
          <p className="text-[#64748B]">Here's what's happening with your content today.</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl border border-[#E2E8F0] shadow-sm text-sm font-semibold text-[#64748B]">
          Last 30 Days
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="h-10 w-10 bg-blue-50 text-[#2563EB] rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
            <span className="flex items-center text-sm font-bold text-[#16A34A] bg-[#F0FDF4] px-2 py-1 rounded-md">
              <TrendingUp className="h-3 w-3 mr-1" /> +12%
            </span>
          </div>
          <h3 className="text-[#64748B] font-semibold text-sm mb-1">Total Audience</h3>
          <p className="text-3xl font-bold text-[#0F172A]">24.5K</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="h-10 w-10 bg-blue-50 text-[#2563EB] rounded-lg flex items-center justify-center">
              <BarChart className="h-5 w-5" />
            </div>
            <span className="flex items-center text-sm font-bold text-[#16A34A] bg-[#F0FDF4] px-2 py-1 rounded-md">
              <TrendingUp className="h-3 w-3 mr-1" /> +28%
            </span>
          </div>
          <h3 className="text-[#64748B] font-semibold text-sm mb-1">Total Views</h3>
          <p className="text-3xl font-bold text-[#0F172A]">142.8K</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="h-10 w-10 bg-cyan-50 text-[#06B6D4] rounded-lg flex items-center justify-center">
              <Target className="h-5 w-5" />
            </div>
            <span className="flex items-center text-sm font-bold text-[#DC2626] bg-[#FEF2F2] px-2 py-1 rounded-md">
              <TrendingUp className="h-3 w-3 mr-1 rotate-180" /> -2%
            </span>
          </div>
          <h3 className="text-[#64748B] font-semibold text-sm mb-1">Engagement Rate</h3>
          <p className="text-3xl font-bold text-[#0F172A]">6.8%</p>
        </div>

        <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] p-6 rounded-2xl shadow-md text-white relative overflow-hidden">
          <div className="absolute -right-6 -top-6 h-24 w-24 bg-[#2563EB] rounded-full blur-2xl opacity-50"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div className="h-10 w-10 bg-white/10 text-white rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5" />
            </div>
          </div>
          <h3 className="text-slate-300 font-semibold text-sm mb-1 relative z-10">Next Best Action</h3>
          <p className="text-lg font-bold leading-snug mb-3 relative z-10">Create a follow-up to your most viral video.</p>
          <Link to="/creator/next-action" className="inline-flex items-center text-sm font-semibold text-[#93C5FD] hover:text-white transition-colors relative z-10">
            View Details <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm h-80 flex flex-col items-center justify-center">
          <BarChart className="h-12 w-12 text-[#94A3B8] mb-4" />
          <p className="text-[#0F172A] font-semibold mb-2">Connect Data to See Charts</p>
          <p className="text-[#64748B] text-sm text-center max-w-xs mb-4">Go to the Analytics page to view your connected data sources.</p>
          <Link to="/creator/analytics" className="text-[#2563EB] font-medium text-sm hover:underline">
            Go to Analytics
          </Link>
        </div>
        
        <div className="bg-white p-8 rounded-2xl border border-[#E2E8F0] shadow-sm h-80 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#0F172A] mb-2">Recent Insights</h2>
            <p className="text-[#64748B] text-sm">AI-generated findings from your audience data.</p>
          </div>
          
          <div className="space-y-4 flex-1 mt-6">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start">
              <div className="h-2 w-2 bg-[#16A34A] rounded-full mt-2 mr-3"></div>
              <p className="text-sm text-[#0F172A]">Your audience responds best to videos under 60 seconds.</p>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-start">
              <div className="h-2 w-2 bg-[#2563EB] rounded-full mt-2 mr-3"></div>
              <p className="text-sm text-[#0F172A]">A new trend "AI tools 2024" is emerging in your niche.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
