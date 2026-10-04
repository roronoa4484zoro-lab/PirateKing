import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

interface Request {
  id: string;
  user_name: string;
  message: string;
  status: string;
  created_at: string;
}

export const RequestList: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching requests:', error);
    } else {
      setRequests(data || []);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('requests')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('Error updating status:', error);
    } else {
      fetchRequests();
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) {
    return <div className="text-white/50 text-center py-10">Loading requests...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {requests.length === 0 ? (
        <div className="text-white/50 text-center py-10">No requests found.</div>
      ) : (
        requests.map((req) => (
          <div
            key={req.id}
            className="bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-md flex flex-col gap-3"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-white">{req.user_name}</h3>
                <p className="text-xs text-white/40">{new Date(req.created_at).toLocaleString()}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                req.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                req.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                'bg-orange-500/20 text-orange-400'
              }`}>
                {req.status}
              </span>
            </div>
            <p className="text-white/80 text-sm italic">"{req.message}"</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => updateStatus(req.id, 'completed')}
                className="flex-1 py-1 text-xs bg-green-500/20 hover:bg-green-500/40 text-green-400 rounded-md transition-colors"
              >
                Complete
              </button>
              <button
                onClick={() => updateStatus(req.id, 'rejected')}
                className="flex-1 py-1 text-xs bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-md transition-colors"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
