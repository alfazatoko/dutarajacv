import React from 'react';
import { LayoutGrid, Moon, Sun, Download, Cloud, LogOut, Smartphone } from 'lucide-react';
import type { User as FirebaseUser } from 'firebase/auth';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onDownload: () => void;
  onSave: () => void;
  isSaving: boolean;
  user: FirebaseUser | null;
  onLogin: () => void;
  onLogout: () => void;
  onInstallPWA: () => void;
  showInstallBtn: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  isDarkMode, 
  toggleDarkMode, 
  onDownload, 
  onSave, 
  isSaving,
  user,
  onLogin,
  onLogout,
  onInstallPWA,
  showInstallBtn
}) => {
  return (
    <header className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-50 px-4 py-2 flex justify-between items-center transition-all border-b border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-4">
        {/* Branded Logo Block */}
        <div className="flex items-center group cursor-pointer">
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200 dark:shadow-none group-hover:rotate-12 transition-transform duration-300">
            <LayoutGrid size={24} className="text-white" />
          </div>
          <div className="ml-3 hidden sm:block">
            <h1 className="text-lg font-black tracking-tighter text-gray-900 dark:text-white leading-none">DUTA RAJA <span className="text-blue-600">CV</span></h1>
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em]">Professional Builder</p>
          </div>
        </div>
        
        {/* PWA Install Text/Button */}
        {showInstallBtn && (
          <button 
            onClick={onInstallPWA}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full border border-green-100 dark:border-green-800 hover:bg-green-100 transition-colors"
          >
            <Smartphone size={14} />
            <span className="text-[11px] font-black uppercase tracking-wider">Install Aplikasi PWA</span>
          </button>
        )}
      </div>
      
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Google Login Button */}
        {user ? (
          <div className="flex items-center gap-3 pr-2 border-r border-gray-100 dark:border-gray-800">
            <div className="hidden lg:block text-right">
              <p className="text-[10px] font-bold text-gray-400 uppercase">Selamat Datang</p>
              <p className="text-xs font-black text-gray-700 dark:text-gray-200 truncate max-w-[120px]">{user.displayName || 'User'}</p>
            </div>
            <button 
              onClick={onLogout}
              className="group relative"
              title="Keluar"
            >
              <img 
                src={user.photoURL || ''} 
                alt="Profile" 
                className="w-9 h-9 rounded-full border-2 border-blue-100 dark:border-gray-700 hover:border-blue-500 transition-all"
              />
              <div className="absolute -bottom-1 -right-1 bg-red-500 text-white p-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <LogOut size={10} />
              </div>
            </button>
          </div>
        ) : (
          <button 
            onClick={onLogin}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-sm group"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4" />
            <span className="text-xs font-black text-gray-700 dark:text-gray-200 uppercase tracking-wider group-hover:text-blue-600 transition-colors">Login Akun Google</span>
          </button>
        )}

        <div className="flex items-center gap-1">
          <button 
            onClick={onSave}
            disabled={isSaving}
            className="p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-500 transition-all disabled:opacity-50"
            title="Simpan ke Database"
          >
            <Cloud size={20} className={isSaving ? "animate-pulse text-blue-600" : ""} />
          </button>

          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-all"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <button 
          onClick={onDownload}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-black transition-all shadow-lg shadow-blue-200 dark:shadow-none active:scale-95 group"
        >
          <Download size={18} className="group-hover:-translate-y-0.5 transition-transform" />
          <span className="hidden lg:inline text-[13px] uppercase tracking-wider">Simpan PDF</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
