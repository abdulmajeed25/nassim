import React, { createContext, useContext, useEffect, useState } from 'react';
import { User as FirebaseUser, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../shared/firebase';
import { User } from '../../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              id: firebaseUser.uid,
              email: firebaseUser.email!,
              name: userData.name || firebaseUser.displayName || 'مستخدم',
              role: userData.role || 'viewer',
              createdAt: userData.createdAt?.toDate() || new Date()
            });
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    // Real admin credentials for Nasim company
    if (email === 'admin@nasim-ac.com' && password === 'Nasim2024@Admin') {
      // Create admin user for Nasim AC company
      const adminUser: User = {
        id: 'nasim-admin-001',
        email: 'admin@nasim-ac.com',
        name: 'م. أحمد النسيم - مدير عام شركة نسيم',
        role: 'admin',
        createdAt: new Date()
      };
      setUser(adminUser);
      return;
    }
    
    // Technical manager credentials
    if (email === 'tech@nasim-ac.com' && password === 'NasimTech2024') {
      const techUser: User = {
        id: 'nasim-tech-001',
        email: 'tech@nasim-ac.com',
        name: 'أ. محمد الفني - مدير فني',
        role: 'editor',
        createdAt: new Date()
      };
      setUser(techUser);
      return;
    }
    
    // Try Firebase authentication for other users
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error('خطأ في البريد الإلكتروني أو كلمة المرور');
    }
  };

  const logout = async () => {
    // Handle local admin users logout
    if (user?.id === 'nasim-admin-001' || user?.id === 'nasim-tech-001') {
      setUser(null);
      return;
    }
    
    // Handle Firebase user logout
    await signOut(auth);
  };

  const value = {
    user,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};