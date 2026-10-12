import React, { createContext, useContext, useState, useEffect } from 'react';

type CreatorType = 'beginner' | 'existing' | null;

interface User {
  id: number;
  name: string;
  email: string;
  creator_type: CreatorType;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: () => void; // Not used but keeping signature for now
  logout: () => void;
  updateCreatorType: (type: CreatorType) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read from localStorage for prototype
    const storedType = localStorage.getItem('creatorType') as CreatorType;
    if (storedType) {
      setUser({
        id: 1,
        name: 'Demo User',
        email: 'demo@creatorpath.ai',
        creator_type: storedType,
      });
    }
    setLoading(false);
  }, []);

  const login = () => {
    // no-op for now
  };

  const logout = () => {
    localStorage.removeItem('creatorType');
    setUser(null);
  };

  const updateCreatorType = (type: CreatorType) => {
    if (type) {
        localStorage.setItem('creatorType', type);
    } else {
        localStorage.removeItem('creatorType');
    }
    setUser({
      id: 1,
      name: 'Demo User',
      email: 'demo@creatorpath.ai',
      creator_type: type,
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateCreatorType }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
