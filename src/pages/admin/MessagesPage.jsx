import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { CheckCircle2, Circle } from 'lucide-react';

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    setLoading(true);
    const { data } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
    if (data) setMessages(data);
    setLoading(false);
  }

  async function toggleRead(id, currentStatus) {
    await supabase.from('messages').update({ read: !currentStatus }).eq('id', id);
    fetchMessages();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 border-b-4 border-black pb-8">
        <h2 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tight">Messages</h2>
        <p className="text-xl font-bold uppercase tracking-wider bg-black text-white inline-block px-4 py-2 self-start">Contact form submissions</p>
      </div>

      <div className="bg-white border-black shadow-neo-lg overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead className="bg-accent-2 border-b-4 border-black">
            <tr>
              <th className="px-6 py-4 font-black uppercase tracking-wider border-r-4 border-black w-24">Status</th>
              <th className="px-6 py-4 font-black uppercase tracking-wider border-r-4 border-black">Name</th>
              <th className="px-6 py-4 font-black uppercase tracking-wider border-r-4 border-black">Email</th>
              <th className="px-6 py-4 font-black uppercase tracking-wider border-r-4 border-black">Message</th>
              <th className="px-6 py-4 font-black uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y-4 divide-black">
            {loading ? (
              <tr><td colSpan="5" className="px-6 py-8 text-center font-bold uppercase">Loading...</td></tr>
            ) : messages.length === 0 ? (
              <tr><td colSpan="5" className="px-6 py-8 text-center font-bold uppercase">No messages yet.</td></tr>
            ) : (
              messages.map(msg => (
                <tr key={msg.id} className={`transition-transform hover:-translate-y-1 relative z-10 hover:z-20 bg-white shadow-sm ${!msg.read ? '!bg-accent-1' : ''}`}>
                  <td className="px-6 py-4 border-r-4 border-black text-center">
                    <button 
                      onClick={() => toggleRead(msg.id, msg.read)}
                      className={`p-2 border-black shadow-neo-sm transition-transform hover:-translate-y-1 ${msg.read ? 'bg-white text-black' : 'bg-accent-2 text-white'}`}
                      title={msg.read ? "Mark as unread" : "Mark as read"}
                    >
                      {msg.read ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                    </button>
                  </td>
                  <td className="px-6 py-4 font-bold border-r-4 border-black text-lg whitespace-nowrap">{msg.name}</td>
                  <td className="px-6 py-4 font-bold border-r-4 border-black">{msg.email}</td>
                  <td className="px-6 py-4 border-r-4 border-black font-medium" title={msg.message}>
                    <div className="line-clamp-2">{msg.message}</div>
                  </td>
                  <td className="px-6 py-4 font-bold whitespace-nowrap text-lg">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
