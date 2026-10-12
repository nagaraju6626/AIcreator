import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface JourneyState {
  nicheCompleted: boolean;
  learningCompleted: boolean;
  practiceCompleted: boolean;
  contentIdeasCompleted: boolean;
  testContentCompleted: boolean;
  improveGrowCompleted: boolean;
  selectedNiche: string | null;
  courseProgress?: Record<string, string[]>; // courseId -> array of completed lessonIds
  // Profile data from Find Niche
  interests?: string[];
  skills?: string[];
  audience?: string[];
  platform?: string[];
  contentType?: string[];
  goal?: string[];
  nicheScore?: number;
  nicheReason?: string;
}

const defaultState: JourneyState = {
  nicheCompleted: false,
  learningCompleted: false,
  practiceCompleted: false,
  contentIdeasCompleted: false,
  testContentCompleted: false,
  improveGrowCompleted: false,
  selectedNiche: null,
  courseProgress: {}
};

interface JourneyContextType {
  journey: JourneyState;
  updateJourney: (updates: Partial<JourneyState>) => void;
  progress: {
    completedCount: number;
    percentage: number;
    currentStep: number;
    currentStepName: string;
  };
}

const JourneyContext = createContext<JourneyContextType | undefined>(undefined);

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [journey, setJourney] = useState<JourneyState>(() => {
    const saved = localStorage.getItem('creatorJourney');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...defaultState, ...parsed };
      } catch (e) {
        console.error('Failed to parse journey state', e);
      }
    }
    
    // Fallback for legacy
    const legacyNiche = localStorage.getItem('selectedNiche');
    if (legacyNiche) {
      return { ...defaultState, nicheCompleted: true, selectedNiche: legacyNiche };
    }
    
    return defaultState;
  });

  const updateJourney = (updates: Partial<JourneyState>) => {
    setJourney(prev => {
      const newState = { ...prev, ...updates };
      localStorage.setItem('creatorJourney', JSON.stringify(newState));
      return newState;
    });
  };

  const completedCount = [
    journey.nicheCompleted,
    journey.learningCompleted,
    journey.practiceCompleted,
    journey.contentIdeasCompleted,
    journey.testContentCompleted,
    journey.improveGrowCompleted
  ].filter(Boolean).length;

  const percentage = Math.round((completedCount / 6) * 100);

  let currentStep = 1;
  let currentStepName = "Find Your Niche";
  
  if (journey.nicheCompleted) { currentStep = 2; currentStepName = "Learn Creator Skills"; }
  if (journey.nicheCompleted && journey.learningCompleted) { currentStep = 3; currentStepName = "Practice With AI"; }
  if (journey.nicheCompleted && journey.learningCompleted && journey.practiceCompleted) { currentStep = 4; currentStepName = "Generate Content Ideas"; }
  if (journey.nicheCompleted && journey.learningCompleted && journey.practiceCompleted && journey.contentIdeasCompleted) { currentStep = 5; currentStepName = "Test Content"; }
  if (journey.nicheCompleted && journey.learningCompleted && journey.practiceCompleted && journey.contentIdeasCompleted && journey.testContentCompleted) { currentStep = 6; currentStepName = "Improve & Grow"; }
  if (completedCount === 6) { currentStep = 7; currentStepName = "Journey Complete"; }

  return (
    <JourneyContext.Provider value={{
      journey,
      updateJourney,
      progress: { completedCount, percentage, currentStep, currentStepName }
    }}>
      {children}
    </JourneyContext.Provider>
  );
}

export function useJourney() {
  const context = useContext(JourneyContext);
  if (context === undefined) {
    throw new Error('useJourney must be used within a JourneyProvider');
  }
  return context;
}
