import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export const AdminGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error('Auth verification error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    checkUser();
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] text-[#f5f5f0] selection:bg-[#c5a059]/30">
        <div className="w-8 h-8 rounded-full border border-white/20 border-t-[#c5a059] animate-spin mb-4" />
        <span className="text-xs font-mono tracking-[0.25em] text-steel-500 uppercase">
          VERIFYING SEAL...
        </span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-[#050505] text-[#f5f5f0] p-6 text-center selection:bg-[#c5a059]/30">
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background: 'radial-gradient(circle at center, rgba(197, 160, 89, 0.15) 0%, transparent 60%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-sm w-full bg-[#080808]/85 border border-white/[0.12] p-8 rounded-xl backdrop-blur-md shadow-[0_16px_50px_rgba(0,0,0,0.9)]">
          <div className="w-12 h-12 mx-auto mb-5 rounded-full border border-white/[0.12] flex items-center justify-center bg-white/[0.03]">
            <ShieldAlert className="w-5 h-5 text-[#c5a059]" />
          </div>

          <h2 className="font-serif text-xl font-bold tracking-tight text-[#f5f5f0] mb-2">
            COMMAND RESTRICTED
          </h2>
          <p className="text-steel-400 text-xs leading-relaxed mb-6">
            Authentication seal required to inspect recorded blade requests.
          </p>

          <button
            onClick={() => supabase.auth.signInWithOAuth({ provider: 'github' })}
            className="w-full flex items-center justify-center gap-2.5 px-5 py-2.5 bg-gradient-to-b from-[#1c1c1c] to-[#0e0e0e] hover:from-[#252525] hover:to-[#141414] border border-white/20 hover:border-white/40 text-[#f5f5f0] text-xs font-medium tracking-wider uppercase rounded-lg transition-all duration-200 active:scale-[0.98] mb-4 shadow-lg"
          >
            <svg className="w-4 h-4 fill-current text-steel-300" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            <span>Sign in with GitHub</span>
          </button>

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono tracking-wider text-steel-500 hover:text-steel-300 transition-colors uppercase pt-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Site</span>
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

