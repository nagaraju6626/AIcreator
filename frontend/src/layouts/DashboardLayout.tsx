import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Home, Compass, BookOpen, Sparkles, Lightbulb, 
  FlaskConical, TrendingUp, Settings, LogOut, 
  Search, Bell, Sun, ChevronDown, Link as LinkIcon, BarChart2, Users, Flame, Bot
} from 'lucide-react';

export default function DashboardLayout({ type }: { type: 'beginner' | 'creator' }) {
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const beginnerNav = [
    { name: 'Home', path: '/beginner/dashboard', icon: Home },
    { name: 'My Journey', path: '/beginner/journey', icon: Compass },
    { name: 'Find My Niche', path: '/beginner/niche', icon: null, img: '/images/target_icon.jpg' },
    { name: 'Learn', path: '/beginner/learn', icon: null, img: '/images/books_icon.jpg' },
    { name: 'Practice with AI', path: '/beginner/practice', icon: null, img: '/images/bot_icon.jpg' },
    { name: 'Content Ideas', path: '/beginner/content-ideas', icon: null, img: '/images/bulb_icon.jpg' },
    { name: 'Test Content', path: '/beginner/test', icon: null, img: '/images/flask_icon.jpg' },
    { name: 'Improve & Grow', path: '/beginner/improve', icon: null, img: '/images/chart_icon.jpg' },
  ];

  const creatorNav = [
    { name: 'Dashboard', path: '/creator/dashboard', icon: Home },
    { name: 'Connect Accounts', path: '/creator/connect', icon: LinkIcon },
    { name: 'Content Analytics', path: '/creator/analytics', icon: BarChart2 },
    { name: 'Audience Insights', path: '/creator/audience', icon: Users },
    { name: 'Viral Patterns', path: '/creator/viral-patterns', icon: Flame },
    { name: 'Content Opportunities', path: '/creator/opportunities', icon: Lightbulb },
    { name: 'Creator AI Copilot', path: '/creator/copilot', icon: Bot },
    { name: 'Growth & Recommendations', path: '/creator/growth', icon: TrendingUp },
  ];

  const navItems = type === 'creator' ? creatorNav : beginnerNav;

  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden font-sans">
      
      {/* Sidebar */}
      <div className="w-[280px] bg-white border-r border-slate-200 flex flex-col flex-shrink-0 h-screen overflow-y-auto">
        
        {/* Logo */}
        <div className="h-[72px] flex flex-col justify-center px-6 border-b border-slate-100 flex-shrink-0 sticky top-0 bg-white z-20">
          <Link to="/" className="flex items-center">
            {/* Custom Logo SVG mimicking the blue triangle 'A' */}
            <div className="relative w-7 h-7 mr-3 flex-shrink-0">
              <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 2L2 26H30L16 2Z" fill="#2563EB" />
                <path d="M16 12L8 26H24L16 12Z" fill="#60A5FA" />
                <path d="M16 2L16 12L24 26H30L16 2Z" fill="#1D4ED8" />
              </svg>
            </div>
            <div>
              <h1 className="text-[19px] font-extrabold text-slate-900 leading-none tracking-tight">CreatorPath AI</h1>
              <p className="text-[10px] font-medium text-slate-500 mt-0.5">Create • Learn • Grow</p>
            </div>
          </Link>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 py-4 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.name==='Home' && location.pathname==='/beginner/dashboard');
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-3 py-2.5 text-[14px] font-semibold rounded-xl transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.img ? (
                  <div className={`mr-3 h-5 w-5 rounded overflow-hidden ${isActive ? 'bg-white/20 p-0.5' : 'opacity-70 mix-blend-multiply bg-white'}`}>
                    <img src={item.img} alt={item.name} className="w-full h-full object-cover mix-blend-multiply rounded-sm" />
                  </div>
                ) : item.icon ? (
                  <item.icon className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-slate-400'}`} strokeWidth={isActive ? 2.5 : 2} />
                ) : null}
                {item.name}
              </Link>
            );
          })}

          <div className="pt-2 mt-2 border-t border-slate-100">
            <Link to={type === 'creator' ? '/creator/settings' : '#'} className={`flex items-center px-3 py-2.5 text-[14px] font-semibold rounded-xl transition-all ${
                  location.pathname === (type === 'creator' ? '/creator/settings' : '#')
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-sm' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}>
              <Settings className={`mr-3 h-5 w-5 ${location.pathname === (type === 'creator' ? '/creator/settings' : '#') ? 'text-white' : 'text-slate-400'}`} strokeWidth={2} />
              Settings
            </Link>
          </div>
        </nav>

        {/* Profile */}
        <div className="p-4 flex items-center justify-between border-t border-slate-200 bg-white sticky bottom-0 z-10">
          <div className="flex items-center">
            <div className="h-9 w-9 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
              D
            </div>
            <div className="ml-3">
              <p className="text-[13px] font-bold text-slate-900 leading-tight">
                {type === 'creator' ? 'Demo Creator' : 'Demo User'}
              </p>
              <div className="flex items-center mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5"></div>
                <p className="text-[11px] font-medium text-slate-500 leading-tight">
                  {type === 'creator' ? 'Existing Creator' : 'Beginner'}
                </p>
              </div>
            </div>
          </div>
          <button onClick={handleLogout} className="text-slate-400 hover:text-slate-700 p-2">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-white">
        
        {/* Top Header */}
        <header className="h-[72px] bg-white flex items-center justify-between px-8 flex-shrink-0 border-b border-slate-100 sticky top-0 z-20">
          
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder={type === 'creator' ? "Search for insights, content ideas, or help..." : "Search anything..."}
                className="w-full bg-slate-50 border-none rounded-full py-2.5 pl-10 pr-4 text-[14px] focus:ring-2 focus:ring-blue-100 outline-none text-slate-700 placeholder-slate-400"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-5 ml-6">
            <button className="text-slate-400 hover:text-slate-700 relative">
              <Bell className="h-5 w-5" strokeWidth={1.5} />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <button className="text-slate-400 hover:text-slate-700">
              <Sun className="h-5 w-5" strokeWidth={1.5} />
            </button>
            
            <div className="flex items-center cursor-pointer pl-4 border-l border-slate-200">
              <div className="h-8 w-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm mr-2.5">
                D
              </div>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </div>
          </div>
        </header>
        
        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
