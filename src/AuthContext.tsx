import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Hospital } from './api';

interface AuthContextType {
  hospital: Hospital | null;
  login: (hospital: Hospital) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [hospital, setHospital] = useState<Hospital | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('hospital');
    if (stored) setHospital(JSON.parse(stored));
  }, []);

  const login = (hospital: Hospital) => {
    setHospital(hospital);
    localStorage.setItem('hospital', JSON.stringify(hospital));
  };

  const logout = () => {
    setHospital(null);
    localStorage.removeItem('hospital');
  };

  return (
    <AuthContext.Provider value={{ hospital, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
} 