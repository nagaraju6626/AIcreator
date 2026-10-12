import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, ArrowRight, Video, Camera, ShieldCheck, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function ConnectAccounts() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [igStatus, setIgStatus] = useState<any>({ connected: false });
  const [isLoading, setIsLoading] = useState(true);

  // Fallback token for testing since frontend auth isn't fully wired to backend yet
  const token = localStorage.getItem('access_token') || 'dummy_token';

  useEffect(() => {
    // Fetch Instagram connection status on load
    const fetchStatus = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/oauth/instagram/status', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setIgStatus(data);
        }
      } catch (err) {
        console.error("Failed to check Instagram status:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStatus();
  }, [token]);

  const handleConnect = () => {
    // For prototype, just navigate directly to the dashboard
    navigate('/creator/dashboard');
  };

  const handleInstagramConnect = async () => {
    try {
      // 1. Get the OAuth redirect URL from the backend
      const response = await fetch('http://localhost:8000/api/oauth/instagram/login', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error("Failed to get Instagram OAuth URL");
      }
      
      const data = await response.json();
      
      // 2. Redirect the browser to Meta's OAuth page
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
      alert("Unable to start Instagram connection. Please try again.");
    }
  };

  return (
    <div className="p-10 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-3xl md:text-4xl font-bold text-[#0F172A] mb-4">Connect Your Creator Accounts</h1>
        <p className="text-[#64748B] max-w-2xl mx-auto">
          Connect your authorized social-media accounts or upload analytics data to unlock CreatorPath AI intelligence.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* API Connections */}
        <div>
          <h2 className="text-xl font-semibold text-[#0F172A] mb-6 flex items-center">
            <ShieldCheck className="h-6 w-6 mr-2 text-[#2563EB]" />
            Secure API Connections
          </h2>
          
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center justify-between hover:border-red-300 transition-colors">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mr-4">
                  <Video className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#0F172A]">YouTube</h3>
                  <p className="text-sm text-[#64748B]">Connect your channel analytics</p>
                </div>
              </div>
              <button onClick={handleConnect} className="bg-[#0F172A] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-red-600 transition-colors shadow-sm">
                Connect
              </button>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#E2E8F0] shadow-sm flex items-center justify-between hover:border-amber-300 transition-colors">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mr-4">
                  <Camera className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#0F172A]">Instagram</h3>
                  <p className="text-sm text-[#64748B]">
                    {igStatus.connected ? `Connected as @${igStatus.username}` : "Connect professional account"}
                  </p>
                </div>
              </div>
              
              {isLoading ? (
                <div className="px-5 py-2.5 text-sm text-[#64748B]">Checking...</div>
              ) : igStatus.connected ? (
                <button disabled className="bg-green-50 text-green-700 border border-green-200 px-5 py-2.5 rounded-xl font-medium shadow-sm flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" /> Connected
                </button>
              ) : (
                <button onClick={handleInstagramConnect} className="bg-[#0F172A] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-amber-600 transition-colors shadow-sm">
                  Connect
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Manual Upload */}
        <div>
          <div className="flex items-center justify-center mb-6">
            <div className="h-px bg-[#E2E8F0] flex-1"></div>
            <span className="px-4 text-sm font-bold text-[#94A3B8] uppercase tracking-wider">OR</span>
            <div className="h-px bg-[#E2E8F0] flex-1"></div>
          </div>

          <h2 className="text-xl font-semibold text-[#0F172A] mb-6">Upload Analytics Data</h2>
          
          <div className="bg-slate-50 border-2 border-dashed border-[#E2E8F0] rounded-3xl p-10 flex flex-col items-center justify-center text-center hover:border-[#2563EB] hover:bg-[#EFF6FF]/50 transition-colors cursor-pointer group">
            <div className="h-16 w-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Upload className="h-8 w-8 text-[#2563EB]" />
            </div>
            <h3 className="font-semibold text-[#0F172A] mb-2">Upload CSV / Excel</h3>
            <p className="text-[#64748B] text-sm max-w-xs mb-6">
              Export your data from YouTube Studio or Meta Business Suite and upload it directly.
            </p>
            <button onClick={handleConnect} className="inline-flex items-center text-[#2563EB] font-semibold hover:text-blue-700 transition-colors">
              Select File <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
