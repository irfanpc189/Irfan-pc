import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { LayoutDashboard, FolderKanban, FileText, Mail, Settings, LogOut, Briefcase } from 'lucide-react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Projects', path: '/admin/projects', icon: FolderKanban },
    { name: 'Case Studies', path: '/admin/case-studies', icon: Briefcase },
    { name: 'Blog', path: '/admin/blog', icon: FileText },
    { name: 'Messages', path: '/admin/messages', icon: Mail },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-grid text-black font-body">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r-4 border-black z-20 flex flex-col">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-20 border-b-4 border-black px-4 bg-primary text-white shadow-neo">
            <h1 className="text-2xl font-display font-black tracking-widest uppercase">IRFAN ADMIN</h1>
          </div>
          
          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 border-black font-bold uppercase transition-all ${
                    isActive 
                      ? 'bg-accent-1 text-black shadow-neo transform translate-x-1 translate-y-1' 
                      : 'bg-white text-black hover:bg-accent-1'
                  }`}
                  style={isActive ? { transform: 'translate(4px, 4px)' } : {}}
                >
                  <item.icon size={20} />
                  <span className="font-semibold">{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t-4 border-black bg-accent-2">
            <button
              onClick={handleLogout}
              className="neo-btn w-full flex items-center justify-center gap-3"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}
