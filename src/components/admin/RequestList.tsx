import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Clock, Inbox, RefreshCw } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface RequestItem {
  id: string;
  user_name: string;
  message: string;
  status: string;
  created_at: string;
}

export const RequestList: React.FC = () => {
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchRequests = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching requests:', error);
      } else {
        setRequests(data || []);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    
    // Optimistic UI update
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );

    try {
      const { error } = await supabase
        .from('requests')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) {
        console.error('Error updating status:', error);
        // Rollback if needed by re-fetching
        fetchRequests();
      }
    } catch (err) {
      console.error('Update status error:', err);
      fetchRequests();
    } finally {
      setTimeout(() => setUpdatingId(null), 600);
    }
  };

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const { data, error } = await supabase
        .from('requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (isMounted) {
        if (!error && data) setRequests(data);
        setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const formatTimestamp = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${day} ${month} ${year} · ${hours}:${minutes}`;
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 select-none">
        <div className="w-8 h-8 rounded-full border border-white/20 border-t-[#c5a059] animate-spin mb-4" />
        <span className="text-xs font-mono tracking-[0.25em] text-steel-500 uppercase">
          READING SCROLLS...
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* List Header Actions */}
      <div className="flex justify-between items-center pb-2 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono tracking-widest text-steel-400 uppercase">
            LOGGED DISPATCHES ({requests.length})
          </span>
        </div>
        <button
          onClick={() => {
            setLoading(true);
            fetchRequests();
          }}
          className="flex items-center gap-1.5 text-[10px] font-mono tracking-wider text-steel-500 hover:text-steel-200 transition-colors uppercase px-2.5 py-1 rounded border border-white/[0.08] hover:border-white/20 bg-black/40"
          title="Refresh list"
        >
          <RefreshCw className="w-3 h-3" />
          <span>REFRESH</span>
        </button>
      </div>

      {requests.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-20 px-6 text-center bg-[#080808]/60 border border-white/[0.08] rounded-xl"
        >
          <Inbox className="w-8 h-8 text-steel-600 mb-3" />
          <h3 className="font-serif text-lg font-bold tracking-tight text-steel-200 mb-1">
            NO REQUESTS
          </h3>
          <p className="text-xs text-steel-500 tracking-wide font-sans">
            The waters are quiet.
          </p>
        </motion.div>
      ) : (
        <AnimatePresence mode="popLayout">
          {requests.map((req, index) => {
            const isPending = !req.status || req.status === 'pending';
            const isCompleted = req.status === 'completed';
            const isRejected = req.status === 'rejected';
            const isCurrentlyUpdating = updatingId === req.id;

            return (
              <motion.article
                key={req.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.4), ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex flex-col gap-3 p-5 rounded-xl border backdrop-blur-md transition-all duration-300 ${
                  isCurrentlyUpdating
                    ? 'border-[#c5a059]/50 bg-[#12100d]/90'
                    : 'bg-[#090909]/80 border-white/[0.10] hover:border-white/[0.18]'
                }`}
              >
                {/* Top Header: Name and Status */}
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h3 className="font-serif text-base sm:text-lg font-bold tracking-wide text-[#f5f5f0]">
                      {req.user_name}
                    </h3>
                    <p className="text-[11px] font-mono tracking-wider text-steel-500 mt-0.5">
                      {formatTimestamp(req.created_at)}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-[10px] font-mono tracking-widest uppercase border select-none ${
                      isCompleted
                        ? 'bg-emerald-950/30 text-emerald-300/90 border-emerald-500/25'
                        : isRejected
                        ? 'bg-rose-950/30 text-rose-300/90 border-rose-500/25'
                        : 'bg-amber-950/30 text-amber-200/90 border-amber-500/25'
                    }`}
                  >
                    {isPending && <Clock className="w-2.5 h-2.5" />}
                    {isCompleted && <Check className="w-2.5 h-2.5" />}
                    {isRejected && <X className="w-2.5 h-2.5" />}
                    <span>{req.status || 'PENDING'}</span>
                  </span>
                </div>

                {/* Message Body */}
                <div className="py-1">
                  <p className="text-sm font-sans text-steel-300 leading-relaxed whitespace-pre-wrap select-text">
                    "{req.message}"
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2.5 pt-2 border-t border-white/[0.06]">
                  <button
                    onClick={() => updateStatus(req.id, 'completed')}
                    disabled={isCompleted}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-[11px] font-mono tracking-wider uppercase rounded-lg border transition-all duration-200 ${
                      isCompleted
                        ? 'opacity-40 cursor-default bg-emerald-950/20 text-emerald-400 border-emerald-500/20'
                        : 'bg-black/60 hover:bg-emerald-950/40 text-steel-300 hover:text-emerald-300 border-white/[0.12] hover:border-emerald-500/40'
                    }`}
                  >
                    <Check className="w-3 h-3" />
                    <span>COMPLETE</span>
                  </button>

                  <button
                    onClick={() => updateStatus(req.id, 'rejected')}
                    disabled={isRejected}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-[11px] font-mono tracking-wider uppercase rounded-lg border transition-all duration-200 ${
                      isRejected
                        ? 'opacity-40 cursor-default bg-rose-950/20 text-rose-400 border-rose-500/20'
                        : 'bg-black/60 hover:bg-rose-950/40 text-steel-300 hover:text-rose-300 border-white/[0.12] hover:border-rose-500/40'
                    }`}
                  >
                    <X className="w-3 h-3" />
                    <span>REJECT</span>
                  </button>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      )}
    </div>
  );
};

