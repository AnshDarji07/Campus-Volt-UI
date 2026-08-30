import { useState, useEffect, createContext, useContext, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("smart_energy_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string, name?: string) => {
    // Mock authentication - in real app, this would call an API
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name: name || email.split("@")[0],
    };
    
    setUser(newUser);
    localStorage.setItem("smart_energy_user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("smart_energy_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    // Return a default implementation if used outside provider
    return {
      user: null,
      login: async () => {},
      logout: () => {},
    };
  }
  return context;
}
