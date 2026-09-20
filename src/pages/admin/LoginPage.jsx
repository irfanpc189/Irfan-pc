import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-4">
      
      {/* Decorative tag */}
      <div className="mb-8 inline-flex items-center gap-2 neo-tag bg-accent-2 text-white border-black transform -rotate-2">
        <span className="font-bold uppercase tracking-widest">AUTHORIZED PERSONNEL ONLY</span>
      </div>

      <div className="max-w-md w-full bg-white border-black shadow-neo-xl p-8 sm:p-12">
        <h1 className="text-4xl font-display font-black uppercase text-center mb-8" style={{ textShadow: '2px 2px 0px var(--color-accent-1)' }}>SYSTEM LOGIN</h1>
        
        {error && (
          <div className="bg-accent-2 text-white border-black p-4 mb-6 font-bold uppercase shadow-neo">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-6 w-full max-w-md">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-black uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-4 bg-white border-black font-bold shadow-neo focus:outline-none focus:-translate-y-1 transition-all"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-black uppercase tracking-wider">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-4 bg-white border-black font-bold shadow-neo focus:outline-none focus:-translate-y-1 transition-all"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full group neo-btn bg-black text-white text-xl py-4 mt-8 disabled:opacity-50 flex justify-center items-center gap-2"
          >
            <span>{loading ? 'AUTHENTICATING...' : 'ACCESS GRANTED'}</span>
            {!loading && <span className="group-hover:translate-x-1 transition-transform">→</span>}
          </button>
        </form>
      </div>
    </div>
  );
}
