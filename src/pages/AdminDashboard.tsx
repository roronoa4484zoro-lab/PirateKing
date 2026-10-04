import React from 'react';
import { AdminGuard } from '../components/admin/AdminGuard';
import { RequestList } from '../components/admin/RequestList';

export default function AdminDashboard() {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-darkest text-white p-6 md:p-12">
        <div className="max-w-2xl mx-auto">
          <header className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-3xl font-black italic tracking-tighter">
                ADMIN <span className="text-orange-500">PANEL</span>
              </h1>
              <p className="text-white/50 text-sm">Manage incoming requests</p>
            </div>
            <button
              onClick={() => window.location.href = '/'}
              className="text-xs text-white/40 hover:text-white transition-colors"
            >
              Back to Site
            </button>
          </header>

          <RequestList />
        </div>
      </div>
    </AdminGuard>
  );
}
