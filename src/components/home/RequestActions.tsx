import { useState } from 'react';
import { MetallicButton } from './ui/MetallicButton';
import { supabase } from '../../lib/supabase';

export const RequestActions: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleDirectMessage = (platform: 'whatsapp' | 'telegram') => {
    const message = encodeURIComponent("Hello! I have a request for you.");
    const url = platform === 'whatsapp'
      ? `https://wa.me/YOUR_PHONE_NUMBER?text=${message}`
      : `https://t.me/YOUR_USERNAME?text=${message}`;
    window.open(url, '_blank');
  };

  const handleDbSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    setStatus('sending');
    try {
      const { error } = await supabase
        .from('requests')
        .insert([{ user_name: formData.name, message: formData.message }]);

      if (error) throw error;
      setStatus('success');
      setFormData({ name: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-xs mx-auto z-30">
      <div className="flex gap-4">
        <MetallicButton
          label="WhatsApp"
          onClick={() => handleDirectMessage('whatsapp')}
          baseColor="#075E54"
          sheenColor="#25D366"
        />
        <MetallicButton
          label="Telegram"
          onClick={() => handleDirectMessage('telegram')}
          baseColor="#0088cc"
          sheenColor="#8ab4f8"
        />
      </div>

      <form onSubmit={handleDbSubmit} className="flex flex-col gap-3 w-full bg-white/5 p-6 rounded-2xl backdrop-blur-md border border-white/10">
        <input
          type="text"
          placeholder="Your Name"
          className="bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500 transition-colors"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <textarea
          placeholder="Your Request"
          className="bg-black/40 border border-white/20 rounded-lg px-4 py-2 text-white placeholder:text-white/30 focus:outline-none focus:border-orange-500 transition-colors h-24 resize-none"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          required
        />

        <MetallicButton
          label={status === 'sending' ? "Sending..." : status === 'success' ? "Sent!" : "Send Request"}
          onClick={() => {}}
          baseColor="#d4af37"
          sheenColor="#fff"
          className="w-full"
        />
        <button type="submit" className="hidden" />
      </form>
    </div>
  );
};
