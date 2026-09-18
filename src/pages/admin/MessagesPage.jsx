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
      <div>
        <h2 className="text-2xl font-bold">Messages</h2>
        <p className="text-gray-500">Contact form submissions.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 font-semibold text-gray-600">Status</th>
              <th className="px-6 py-3 font-semibold text-gray-600">Name</th>
              <th className="px-6 py-3 font-semibold text-gray-600">Email</th>
              <th className="px-6 py-3 font-semibold text-gray-600">Message</th>
              <th className="px-6 py-3 font-semibold text-gray-600">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr><td colSpan="5" className="px-6 py-4 text-center">Loading...</td></tr>
            ) : messages.length === 0 ? (
              <tr><td colSpan="5" className="px-6 py-4 text-center">No messages yet.</td></tr>
            ) : (
              messages.map(msg => (
                <tr key={msg.id} className={`hover:bg-gray-50 ${!msg.read ? 'bg-blue-50' : ''}`}>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => toggleRead(msg.id, msg.read)}
                      className={`p-1 rounded-full ${msg.read ? 'text-green-500' : 'text-gray-400'}`}
                      title={msg.read ? "Mark as unread" : "Mark as read"}
                    >
                      {msg.read ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                    </button>
                  </td>
                  <td className="px-6 py-4 font-medium whitespace-nowrap">{msg.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{msg.email}</td>
                  <td className="px-6 py-4 text-sm max-w-md truncate" title={msg.message}>{msg.message}</td>
                  <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
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
