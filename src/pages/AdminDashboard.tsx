import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AdminGuard } from '../components/admin/AdminGuard';
import { RequestList } from '../components/admin/RequestList';

export default function AdminDashboard() {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#050505] text-[#f5f5f0] p-5 sm:p-8 md:p-12 relative overflow-x-hidden selection:bg-[#c5a059]/30">
        
        {/* Subtle ambient lighting backdrop */}
        <div 
          className="fixed inset-0 pointer-events-none opacity-25 z-0"
          style={{
            background: 'radial-gradient(circle at 50% 20%, rgba(197, 160, 89, 0.08) 0%, transparent 60%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Header */}
          <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 sm:mb-12 pb-6 border-b border-white/[0.08]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[#c5a059] text-[10px]">◇</span>
                <span className="text-[11px] font-mono tracking-[0.25em] text-steel-400 uppercase">
                  PIRATE KING
                </span>
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-[#f5f5f0]">
                ADMIN <span className="text-[#c5a059]">COMMAND</span>
              </h1>
              <p className="text-steel-400 text-xs tracking-wide font-sans mt-0.5">
                Incoming Requests & Dispatches
              </p>
            </div>

            <Link
              to="/"
              className="self-start sm:self-auto inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-white/[0.12] hover:border-white/[0.28] bg-black/60 hover:bg-[#121212] text-xs font-mono tracking-wider text-steel-300 hover:text-[#f5f5f0] transition-all duration-200 uppercase"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-steel-400" />
              <span>RETURN TO SITE</span>
            </Link>
          </header>

          {/* Request List Feed */}
          <main>
            <RequestList />
          </main>
        </div>
      </div>
    </AdminGuard>
  );
}

