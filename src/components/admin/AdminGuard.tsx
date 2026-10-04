import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export const AdminGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };
    checkUser();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-darkest text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-orange-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-darkest text-white p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Admin Access Restricted</h2>
        <p className="text-white/60 mb-8">Please sign in to manage requests.</p>
        <button
          onClick={() => supabase.auth.signInWithOAuth({ provider: 'github' })}
          className="px-6 py-2 bg-orange-500 rounded-full font-bold hover:bg-orange-600 transition-colors"
        >
          Sign in with GitHub
        </button>
      </div>
    );
  }

  return <>{children}</>;
};
