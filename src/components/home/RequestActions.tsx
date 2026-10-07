import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, AlertCircle, MessageSquare } from 'lucide-react';
import { MetallicButton } from './ui/MetallicButton';
import { supabase } from '../../lib/supabase';

export const RequestActions: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');

  const handleDirectMessage = (platform: 'whatsapp' | 'telegram') => {
    const message = encodeURIComponent("Hello! I have a request for you.");
    const url = platform === 'whatsapp'
      ? `https://wa.me/YOUR_PHONE_NUMBER?text=${message}`
      : `https://t.me/YOUR_USERNAME?text=${message}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDbSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;

    setStatus('sending');
    setFeedbackMessage('');

    try {
      const { error } = await supabase
        .from('requests')
        .insert([{ user_name: formData.name.trim(), message: formData.message.trim() }]);

      if (error) throw error;
      setStatus('success');
      setFeedbackMessage('Request engraved. The blade remembers.');
      setFormData({ name: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
      setFeedbackMessage('Could not submit request. Please try again or reach out directly.');
    } finally {
      setTimeout(() => {
        setStatus('idle');
      }, 4500);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-sm mx-auto z-30">
      {/* Direct Communication Channels */}
      <div className="grid grid-cols-2 gap-3 w-full" role="region" aria-label="Direct Communication">
        <MetallicButton
          label="WhatsApp"
          onClick={() => handleDirectMessage('whatsapp')}
          variant="steel"
          className="w-full justify-center"
          icon={<MessageSquare className="w-3.5 h-3.5" />}
        />
        <MetallicButton
          label="Telegram"
          onClick={() => handleDirectMessage('telegram')}
          variant="steel"
          className="w-full justify-center"
          icon={<Send className="w-3.5 h-3.5" />}
        />
      </div>

      {/* Engraved Request Interface */}
      <form
        onSubmit={handleDbSubmit}
        className="relative flex flex-col gap-4 w-full bg-[#080808]/75 backdrop-blur-lg p-5 sm:p-6 rounded-xl border border-white/[0.12] shadow-[0_12px_40px_rgba(0,0,0,0.85)]"
      >
        {/* Subtle decorative top hairline edge */}
        <div 
          className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" 
          aria-hidden="true"
        />

        {/* Input: Name */}
        <div className="flex flex-col gap-1.5 text-left">
          <label 
            htmlFor="user_name" 
            className="flex items-center gap-1.5 text-[11px] font-medium tracking-[0.2em] text-steel-400 uppercase select-none"
          >
            <span className="text-[#c5a059]/80 text-[9px]">◇</span> YOUR NAME
          </label>
          <input
            id="user_name"
            type="text"
            placeholder="Enter your name..."
            className="w-full bg-[#050505]/90 border border-white/[0.12] rounded-lg px-3.5 py-2.5 text-sm text-[#f5f5f0] placeholder:text-steel-600 focus:outline-none focus:border-[#c5a059]/60 focus:bg-[#0c0c0c] transition-all duration-200"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            autoComplete="name"
          />
        </div>

        {/* Input: Request */}
        <div className="flex flex-col gap-1.5 text-left">
          <label 
            htmlFor="user_request" 
            className="flex items-center gap-1.5 text-[11px] font-medium tracking-[0.2em] text-steel-400 uppercase select-none"
          >
            <span className="text-[#c5a059]/80 text-[9px]">◇</span> YOUR REQUEST
          </label>
          <textarea
            id="user_request"
            placeholder="Tell me what you need..."
            className="w-full bg-[#050505]/90 border border-white/[0.12] rounded-lg px-3.5 py-2.5 text-sm text-[#f5f5f0] placeholder:text-steel-600 focus:outline-none focus:border-[#c5a059]/60 focus:bg-[#0c0c0c] transition-all duration-200 h-24 resize-none leading-relaxed"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            required
          />
        </div>

        {/* Action Button with States */}
        <div className="pt-1">
          <motion.button
            type="submit"
            disabled={status === 'sending'}
            whileHover={status === 'idle' ? { y: -2 } : {}}
            whileTap={status === 'idle' ? { y: 0 } : {}}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className={`w-full relative overflow-hidden px-5 py-3 rounded-lg border font-medium text-xs tracking-widest uppercase transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]/60 select-none flex items-center justify-center gap-2 ${
              status === 'success'
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                : status === 'error'
                ? 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                : 'bg-gradient-to-b from-[#181510] to-[#0c0a07] border-[#c5a059]/40 hover:border-[#c5a059]/70 text-[#f5f5f0] shadow-lg'
            }`}
          >
            {/* Top light reflection */}
            <div 
              className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/30 to-transparent pointer-events-none" 
              aria-hidden="true"
            />

            <AnimatePresence mode="wait">
              {status === 'sending' && (
                <motion.div
                  key="sending"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-3.5 h-3.5 rounded-full border border-steel-400 border-t-transparent animate-spin" />
                  <span>ENGRAVING REQUEST...</span>
                </motion.div>
              )}

              {status === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex items-center gap-2 font-semibold"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>✓ REQUEST SENT</span>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex items-center gap-2 font-semibold"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
                  <span>REQUEST FAILED · RETRY</span>
                </motion.div>
              )}

              {status === 'idle' && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="flex items-center gap-2"
                >
                  <span>SEND REQUEST</span>
                  <span className="text-[#c5a059] group-hover:translate-x-0.5 transition-transform duration-200">→</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Inline Feedback Banner */}
        <AnimatePresence>
          {feedbackMessage && (
            <motion.p
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: 'auto', marginTop: 4 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              className={`text-xs tracking-wide text-center select-none ${
                status === 'error' ? 'text-rose-400/90' : 'text-[#c5a059]/90'
              }`}
              role="status"
            >
              {feedbackMessage}
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
};

