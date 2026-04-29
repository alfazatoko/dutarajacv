import React, { useState } from 'react';
import { LayoutGrid, Moon, Sun, Download, LogOut, LogIn, ChevronDown, History, Smartphone } from 'lucide-react';
import type { User as FirebaseUser } from 'firebase/auth';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onDownload: () => void;
  user: FirebaseUser | null;
  onLogin: () => void;
  onLogout: () => void;
  onInstallPWA: () => void;
  showInstallBtn: boolean;
  onSave: () => void;
  isSaving: boolean;
  history?: {id: string, nama: string}[];
  onLoadCV?: (id: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  isDarkMode, 
  toggleDarkMode, 
  onDownload, 
  user,
  onLogin,
  onLogout,
  onInstallPWA,
  showInstallBtn,
  onSave,
  isSaving,
  history = [],
  onLoadCV
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-[100] px-4 py-3 flex justify-between items-center transition-all border-b border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-6">
        {/* Logo with Dropdown Trigger */}
        <div className="relative">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center group gap-2"
          >
            <div className={`p-2.5 rounded-2xl shadow-xl transition-all duration-300 ${isMenuOpen ? 'bg-blue-600 scale-95' : 'bg-blue-600 group-hover:rotate-12 shadow-blue-200 dark:shadow-none'}`}>
              <LayoutGrid size={24} className="text-white" />
            </div>
            <ChevronDown size={14} className={`text-gray-400 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)} />
              <div className="absolute top-14 left-0 w-72 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 z-20 py-3 animate-slide-up overflow-hidden max-h-[80vh] flex flex-col">
                <div className="px-4 py-2 mb-2 border-b border-gray-50 dark:border-gray-800 flex items-center gap-3 shrink-0">
                  {user ? (
                    <>
                      <img src={user.photoURL || ''} alt="Profile" className="w-8 h-8 rounded-full border-2 border-blue-100 dark:border-gray-700" />
                      <div className="overflow-hidden">
                        <p className="text-[10px] font-bold text-gray-400 uppercase leading-none">Akun Aktif</p>
                        <p className="text-xs font-black text-gray-700 dark:text-gray-200 truncate">{user.displayName}</p>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center gap-3 text-gray-400">
                      <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"><LogIn size={14}/></div>
                      <p className="text-[11px] font-bold uppercase tracking-wider">Silakan Login</p>
                    </div>
                  )}
                </div>

                {/* History Section (ONLY FOR LOGGED IN USERS) */}
                {user && history.length > 0 && (
                  <div className="px-2 mb-4">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest px-4 mb-2 flex items-center gap-2">
                      <History size={10} className="text-blue-500" />
                      Riwayat Pembuatan CV
                    </p>
                    <div className="max-h-48 overflow-y-auto space-y-1 custom-scrollbar px-1">
                      {history.map((cv) => (
                        <button
                          key={cv.id}
                          onClick={() => { onLoadCV?.(cv.id); setIsMenuOpen(false); }}
                          className="w-full text-left px-4 py-2.5 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all group flex items-center gap-3"
                        >
                          <div className="w-2 h-2 rounded-full bg-blue-400 group-hover:scale-125 transition-transform" />
                          <span className="text-xs font-bold text-gray-600 dark:text-gray-300 truncate">{cv.nama}</span>
                        </button>
                      ))}
                    </div>
                    <div className="border-b border-gray-50 dark:border-gray-800 mt-4 mx-2" />
                  </div>
                )}

                <div className="px-2 space-y-1 shrink-0">
                  <button 
                    onClick={() => { toggleDarkMode(); setIsMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-2xl transition-colors text-left"
                  >
                    <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                      {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                    </div>
                    <div>
                      <p className="text-xs font-black text-gray-700 dark:text-gray-200 uppercase">Tema {isDarkMode ? 'Terang' : 'Gelap'}</p>
                      <p className="text-[9px] text-gray-400">Ganti tampilan aplikasi</p>
                    </div>
                  </button>

                  <button 
                    onClick={() => { user ? onLogout() : onLogin(); setIsMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-2xl transition-colors text-left"
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${user ? 'bg-red-50 dark:bg-red-900/20 text-red-600' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'}`}>
                      {user ? <LogOut size={18} /> : <LogIn size={18} />}
                    </div>
                    <div>
                      <p className="text-xs font-black text-gray-700 dark:text-gray-200 uppercase">{user ? 'Keluar Google' : 'Masuk Google'}</p>
                      <p className="text-[9px] text-gray-400">{user ? 'Akhiri sesi akun ini' : 'Simpan data ke cloud'}</p>
                    </div>
                  </button>

                  <button 
                    onClick={() => { onDownload(); setIsMenuOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl transition-colors text-left group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200 dark:shadow-none group-hover:scale-110 transition-transform">
                      <Download size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase">Simpan PDF</p>
                      <p className="text-[9px] text-gray-400">Unduh hasil CV Anda</p>
                    </div>
                  </button>

                  <button 
                    onClick={() => { onSave(); setIsMenuOpen(false); }}
                    disabled={isSaving}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-2xl transition-colors text-left group disabled:opacity-50"
                  >
                    <div className={`w-8 h-8 rounded-xl bg-green-600 text-white flex items-center justify-center shadow-lg shadow-green-200 dark:shadow-none group-hover:scale-110 transition-transform ${isSaving ? 'animate-pulse' : ''}`}>
                      <History size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-black text-green-600 dark:text-green-400 uppercase">Simpan Online</p>
                      <p className="text-[9px] text-gray-400">Simpan ke akun Anda</p>
                    </div>
                  </button>

                  {showInstallBtn && (
                    <button 
                      onClick={() => { onInstallPWA(); setIsMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-2xl transition-colors text-left group"
                    >
                      <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200 dark:shadow-none group-hover:scale-110 transition-transform">
                        <Smartphone size={18} />
                      </div>
                      <div>
                        <p className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase">INSTALL APLIKASI</p>
                        <p className="text-[9px] text-gray-400 uppercase">Install lewat google chrome</p>
                      </div>
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col">
          <h1 className="text-xl font-black tracking-tighter text-gray-900 dark:text-white leading-none">DUTA RAJA <span className="text-blue-600">CV</span></h1>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mt-1">DESAIN PROFESSIONAL CV</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Placeholder or other elements could go here */}
      </div>
    </header>
  );
};

export default Header;
