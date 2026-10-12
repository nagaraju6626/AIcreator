import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Zap, Sprout, BarChart2, ArrowRight } from 'lucide-react';

export default function CreatorSelection() {
  const navigate = useNavigate();
  const { updateCreatorType } = useAuth();

  const handleSelect = (type: 'beginner' | 'existing') => {
    updateCreatorType(type);
    if (type === 'beginner') {
      navigate('/beginner/dashboard');
    } else {
      navigate('/creator/connect');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 font-sans">
      <div className="text-center mb-12">
        <h2 className="text-[#2563EB] font-bold tracking-widest uppercase text-xs mb-3 flex items-center justify-center">
          <Zap className="h-4 w-4 mr-1" /> CreatorPath AI
        </h2>
        <p className="text-[#64748B] text-sm font-medium mb-6">Create • Learn • Analyze • Grow</p>
        <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">What type of creator are you?</h1>
        <p className="text-[#64748B] max-w-xl mx-auto">
          Choose your path to get a personalized CreatorPath AI experience.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
        {/* Beginner Card */}
        <button 
          onClick={() => handleSelect('beginner')}
          className="bg-white p-10 rounded-2xl border border-[#E2E8F0] shadow-sm hover:border-[#2563EB] hover:shadow-md transition-all text-left group flex flex-col h-full"
        >
          <div className="h-14 w-14 bg-blue-50 text-[#2563EB] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Sprout className="h-7 w-7" />
          </div>
          <h3 className="text-xl font-semibold text-[#0F172A] mb-3">I'm a Beginner</h3>
          <p className="text-[#64748B] mb-8 text-sm leading-relaxed flex-1">
            Start from zero and build your creator skills step-by-step. Learn, create and grow with AI guidance.
          </p>
          <div className="inline-flex items-center text-sm font-medium text-[#2563EB] group-hover:text-blue-700">
            Start My Journey <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>

        {/* Existing Creator Card */}
        <button 
          onClick={() => handleSelect('existing')}
          className="bg-white p-10 rounded-2xl border border-[#E2E8F0] shadow-sm hover:border-[#06B6D4] hover:shadow-md transition-all text-left group flex flex-col h-full"
        >
          <div className="h-14 w-14 bg-cyan-50 text-[#06B6D4] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <BarChart2 className="h-7 w-7" />
          </div>
          <h3 className="text-xl font-semibold text-[#0F172A] mb-3">I'm an Existing Creator</h3>
          <p className="text-[#64748B] mb-8 text-sm leading-relaxed flex-1">
            Analyze your existing content and grow with AI-powered insights, audience sentiment, and recommendations.
          </p>
          <div className="inline-flex items-center text-sm font-medium text-[#06B6D4] group-hover:text-cyan-600">
            Continue <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      </div>
    </div>
  );
}
