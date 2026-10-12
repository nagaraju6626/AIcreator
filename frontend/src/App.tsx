import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import CreatorSelection from './pages/CreatorSelection';

// Layouts
import DashboardLayout from './layouts/DashboardLayout';

// Beginner
import BeginnerDashboard from './pages/beginner/Dashboard';
import FindNiche from './pages/beginner/FindNiche';
import Learn from './pages/beginner/Learn';
import CourseDetail from './pages/beginner/CourseDetail';
import Practice from './pages/beginner/Practice';
import ContentIdeas from './pages/beginner/ContentIdeas';

import MyJourney from './pages/beginner/MyJourney';
import TestContent from './pages/beginner/TestContent';
import ImproveGrow from './pages/beginner/ImproveGrow';

// Creator
import CreatorDashboard from './pages/creator/Dashboard';
import ConnectAccounts from './pages/creator/ConnectAccounts';
import Analytics from './pages/creator/Analytics';
import AudienceVoice from './pages/creator/AudienceVoice';
import ViralPatterns from './pages/creator/ViralPatterns';
import ContentOpportunities from './pages/creator/ContentOpportunities';
import Copilot from './pages/creator/Copilot';
import NextBestAction from './pages/creator/NextBestAction';

// Auth Provider
import { AuthProvider } from './context/AuthContext';
import { JourneyProvider } from './context/JourneyContext';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CreatorSelection />} />
      <Route path="/select-type" element={<Navigate to="/" replace />} />

      <Route path="/beginner" element={<DashboardLayout type="beginner" />}>
        <Route path="dashboard" element={<BeginnerDashboard />} />
        <Route path="journey" element={<MyJourney />} />
        <Route path="niche" element={<FindNiche />} />
        <Route path="learn" element={<Learn />} />
        <Route path="learn/course/:courseId" element={<CourseDetail />} />
        <Route path="practice" element={<Practice />} />
        <Route path="content-ideas" element={<ContentIdeas />} />
        <Route path="test" element={<TestContent />} />
        <Route path="improve" element={<ImproveGrow />} />
      </Route>

      <Route path="/creator" element={<DashboardLayout type="creator" />}>
        <Route path="dashboard" element={<CreatorDashboard />} />
        <Route path="connect" element={<ConnectAccounts />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="audience" element={<AudienceVoice />} />
        <Route path="viral-patterns" element={<ViralPatterns />} />
        <Route path="opportunities" element={<ContentOpportunities />} />
        <Route path="copilot" element={<Copilot />} />
        <Route path="growth" element={<NextBestAction />} />
        <Route path="settings" element={<div className="p-8"><h1 className="text-2xl font-bold">Settings</h1></div>} />
      </Route>
      
      {/* Catch-all redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <JourneyProvider>
          <AppRoutes />
        </JourneyProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;








