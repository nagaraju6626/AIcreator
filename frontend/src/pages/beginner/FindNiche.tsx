import { useState } from 'react';
import { ArrowRight, Check, ArrowLeft, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useJourney } from '../../context/JourneyContext';

const stepsConfig = [
  {
    title: "What topics are you interested in?",
    subtitle: "Select the main areas you want to create content about.",
    key: "interests",
    options: ['Artificial Intelligence', 'Programming', 'Technology', 'Education', 'Gaming', 'Lifestyle', 'Finance', 'Design']
  },
  {
    title: "What skills do you have?",
    subtitle: "Select the skills you already have or want to use for creating content.",
    key: "skills",
    options: ['Python', 'Java', 'Web Development', 'AI / Machine Learning', 'Video Editing', 'Photography', 'Writing', 'Teaching', 'Designing', 'Communication', 'Marketing', 'Other']
  },
  {
    title: "Who do you want to create content for?",
    subtitle: "Choose the audience you want to help or reach.",
    key: "target_audience",
    options: ['Students', 'Beginners', 'Developers', 'Professionals', 'Entrepreneurs', 'General Audience', 'Gamers', 'Fitness Enthusiasts', 'Other']
  },
  {
    title: "Which platform do you want to create on?",
    subtitle: "Where do you want to share your content?",
    key: "platforms",
    options: ['YouTube', 'Instagram', 'TikTok', 'LinkedIn', 'X', 'Multiple Platforms']
  },
  {
    title: "What type of content do you want to create?",
    subtitle: "Choose the formats you want to focus on.",
    key: "content_type",
    options: ['Short Videos', 'Long Videos', 'Tutorials', 'Educational Content', 'Reviews', 'Stories', 'Podcasts', 'Posts', 'Reels / Shorts', 'Other']
  },
  {
    title: "What is your main creator goal?",
    subtitle: "What do you want to achieve as a creator?",
    key: "goal",
    options: ['Teach Others', 'Build a Personal Brand', 'Grow Followers', 'Make Money', 'Build a Career', 'Share Knowledge', 'Build a Community', 'Have Fun']
  }
];

export default function FindNiche() {
  const { updateJourney } = useJourney();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, string[]>>({
    interests: [],
    skills: [],
    target_audience: [],
    platforms: [],
    content_type: [],
    goal: []
  });
  const [error, setError] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);
  const navigate = useNavigate();

  const toggleOption = (key: string, option: string) => {
    setError('');
    setFormData(prev => {
      const current = prev[key] || [];
      if (current.includes(option)) {
        return { ...prev, [key]: current.filter(o => o !== option) };
      } else {
        return { ...prev, [key]: [...current, option] };
      }
    });
  };

  const currentStepData = stepsConfig[step - 1];
  const currentSelections = formData[currentStepData?.key] || [];

  const handleNext = async () => {
    if (currentSelections.length === 0) {
      setError('Please select at least one option to continue.');
      return;
    }

    if (step < 6) {
      setStep(step + 1);
    } else {
      // Submit the form
      setIsAnalyzing(true);
      try {
        const response = await fetch('/api/beginner/niche/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        
        if (response.ok) {
          const data = await response.json();
          setResults(data.recommendations || generateDeterministicResults(formData));
        } else {
          throw new Error('API Error');
        }
      } catch (err) {
        console.log("Falling back to deterministic frontend scoring");
        setResults(generateDeterministicResults(formData));
      }
      setIsAnalyzing(false);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setError('');
    }
  };

  const generateDeterministicResults = (data: typeof formData) => {
    // Generate deterministic niches based on selected options
    const niches = [];
    
    // Niche 1: Tech/Programming Focus
    if (data.interests.some(i => ['Programming', 'Technology', 'Artificial Intelligence'].includes(i))) {
      let score = 50;
      if (data.skills.some(s => ['Python', 'Web Development', 'AI / Machine Learning'].includes(s))) score += 20;
      if (data.target_audience.some(a => ['Developers', 'Students', 'Beginners'].includes(a))) score += 15;
      if (data.goal.some(g => ['Teach Others', 'Share Knowledge', 'Build a Career'].includes(g))) score += 10;
      if (data.content_type.some(c => ['Tutorials', 'Educational Content'].includes(c))) score += 5;
      
      niches.push({
        name: "Tech & Coding Tutorials",
        score: Math.min(score + 35, 98), // Boost base score realistically
        reason: `Your skills in technology and interest in coding strongly match this audience. ${data.target_audience[0] || 'Developers'} are actively searching for ways to improve their workflow, creating a high-demand content gap.`,
        audience: data.target_audience.join(", ") || "Developers & Students",
        ideas: ["10 Python tricks", "How to build a web app", "AI tools for developers"]
      });
    }

    // Niche 2: Lifestyle / General
    if (data.interests.some(i => ['Lifestyle', 'Gaming', 'Design'].includes(i))) {
      let score = 50;
      if (data.skills.some(s => ['Video Editing', 'Photography', 'Designing'].includes(s))) score += 20;
      if (data.platforms.some(p => ['YouTube', 'TikTok', 'Instagram'].includes(p))) score += 15;
      if (data.goal.some(g => ['Build a Community', 'Have Fun', 'Build a Personal Brand'].includes(g))) score += 15;
      
      niches.push({
        name: "Creative Lifestyle & Vlogs",
        score: Math.min(score + 30, 95),
        reason: "Your creative skills and platform choices perfectly align with lifestyle content. This niche allows you to express your personality while building a strong personal brand.",
        audience: data.target_audience.join(", ") || "General Audience",
        ideas: ["Day in my life", "My creative process", "Workspace setup tour"]
      });
    }

    // Default Fallback Niche
    niches.push({
      name: "Educational Content Creation",
      score: 85,
      reason: "Based on your overall profile, sharing your unique perspective through educational content offers the most reliable path to growth and audience building.",
      audience: "Beginners & Students",
      ideas: ["Beginner's guide to your top skill", "Common mistakes to avoid", "Step-by-step tutorials"]
    });

    return niches.sort((a, b) => b.score - a.score).slice(0, 3);
  };

  const handleSelectNiche = (nicheName: string, score?: number, reason?: string) => {
    updateJourney({ 
      nicheCompleted: true, 
      selectedNiche: nicheName,
      interests: formData.interests,
      skills: formData.skills,
      audience: formData.target_audience,
      platform: formData.platforms,
      contentType: formData.content_type,
      goal: formData.goal,
      nicheScore: score,
      nicheReason: reason
    });
    navigate('/beginner/dashboard');
  };

  if (isAnalyzing) {
    return (
      <div className="p-8 max-w-4xl mx-auto h-[calc(100vh-64px)] flex flex-col justify-center items-center">
        <Loader2 className="h-12 w-12 text-[#2563EB] animate-spin mb-6" />
        <h2 className="text-2xl font-bold text-[#0F172A] mb-2">Analyzing your profile...</h2>
        <p className="text-[#64748B]">Finding the perfect niche for your skills and goals.</p>
      </div>
    );
  }

  if (results) {
    return (
      <div className="p-8 max-w-4xl mx-auto min-h-[calc(100vh-64px)] py-12">
        <div className="text-center mb-10">
          <h2 className="text-sm font-bold text-[#2563EB] tracking-widest uppercase mb-2">Analysis Complete</h2>
          <h1 className="text-3xl font-bold text-[#0F172A]">Your Recommended Niches</h1>
        </div>

        <div className="space-y-6">
          {results.map((niche, idx) => (
            <div key={idx} className={`bg-white rounded-2xl border-2 shadow-sm overflow-hidden relative ${idx === 0 ? 'border-[#2563EB] shadow-blue-100' : 'border-slate-200'}`}>
              {idx === 0 && (
                <>
                  <div className="absolute top-0 left-0 w-2 h-full bg-[#2563EB]"></div>
                  <div className="absolute top-0 right-0 px-4 py-1 bg-[#EFF6FF] text-[#2563EB] font-bold text-sm rounded-bl-lg">
                    #1 MATCH
                  </div>
                </>
              )}
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-[#0F172A]">{niche.name}</h3>
                    <p className="text-[#16A34A] font-semibold mt-1">{niche.score}% Match</p>
                  </div>
                </div>

                <div className="bg-[#EFF6FF] p-5 rounded-xl border border-blue-100 mb-6">
                  <h4 className="font-semibold text-[#0F172A] mb-2">Why this fits you</h4>
                  <p className="text-[#64748B] text-sm leading-relaxed">
                    {niche.reason}
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-[#0F172A] mb-3 text-sm uppercase tracking-wider">Target Audience</h4>
                  <p className="text-[#64748B] text-sm bg-slate-50 inline-block px-3 py-1.5 rounded-lg font-medium border border-slate-100">
                    {niche.audience}
                  </p>
                </div>

                <div className="mb-8">
                  <h4 className="font-semibold text-[#0F172A] mb-3 text-sm uppercase tracking-wider">Example Content Ideas</h4>
                  <ul className="space-y-2">
                    {niche.ideas.map((idea: string, i: number) => (
                      <li key={i} className="flex items-center text-sm text-[#64748B]">
                        <Check className="h-4 w-4 text-[#10B981] mr-2 flex-shrink-0" />
                        {idea}
                      </li>
                    ))}
                  </ul>
                </div>

                <button onClick={() => handleSelectNiche(niche.name, niche.score, niche.reason)} className={`w-full sm:w-auto px-8 py-3 rounded-xl font-medium transition-colors shadow-sm flex items-center justify-center ${idx === 0 ? 'bg-[#2563EB] text-white hover:bg-blue-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                  Select This Niche <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto min-h-[calc(100vh-64px)] flex flex-col justify-center py-12">
      <div className="mb-12 text-center">
        <p className="text-sm font-semibold text-[#64748B] tracking-wider mb-4">STEP {step} OF 6</p>
        <div className="flex justify-center items-center space-x-2 mb-8">
          {[1,2,3,4,5,6].map(s => (
            <div key={s} className="flex items-center">
              <div className={`h-2.5 w-2.5 rounded-full ${s <= step ? 'bg-[#2563EB]' : 'bg-[#E2E8F0]'}`}></div>
              {s < 6 && <div className={`w-6 sm:w-8 h-0.5 ${s < step ? 'bg-[#2563EB]' : 'bg-[#E2E8F0]'}`}></div>}
            </div>
          ))}
        </div>
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">{currentStepData.title}</h1>
        <p className="text-[#64748B] text-lg">{currentStepData.subtitle}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {currentStepData.options.map(option => {
          const isSelected = currentSelections.includes(option);
          return (
            <button
              key={option}
              onClick={() => toggleOption(currentStepData.key, option)}
              className={`p-5 rounded-2xl border-2 text-left transition-all ${
                isSelected 
                  ? 'border-[#2563EB] bg-[#EFF6FF] shadow-sm' 
                  : 'border-[#E2E8F0] bg-white hover:border-[#93C5FD]'
              }`}
            >
              <div className={`h-6 w-6 rounded-full border mb-3 flex items-center justify-center transition-colors ${
                isSelected ? 'bg-[#2563EB] border-[#2563EB] text-white' : 'border-[#94A3B8]'
              }`}>
                {isSelected && <Check className="h-4 w-4" strokeWidth={3} />}
              </div>
              <p className={`font-semibold text-[14px] leading-snug ${isSelected ? 'text-[#0F172A]' : 'text-[#64748B]'}`}>
                {option}
              </p>
            </button>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
        <div className="mb-4 sm:mb-0">
          {error && <p className="text-red-500 font-semibold text-sm">{error}</p>}
        </div>
        
        <div className="flex space-x-4">
          {step > 1 && (
            <button 
              onClick={handleBack}
              className="px-6 py-3 rounded-xl font-bold flex items-center text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" strokeWidth={2.5} /> Back
            </button>
          )}
          <button 
            onClick={handleNext}
            className={`px-8 py-3 rounded-xl font-bold flex items-center transition-all ${
              currentSelections.length > 0 
                ? 'bg-[#2563EB] text-white hover:bg-blue-700 shadow-sm' 
                : 'bg-slate-100 text-slate-400'
            }`}
          >
            {step === 6 ? 'Analyze' : 'Continue'} <ArrowRight className="ml-2 h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
