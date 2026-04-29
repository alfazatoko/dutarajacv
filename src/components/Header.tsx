import React from 'react';
import { LayoutGrid, Moon, Sun, Download, Cloud } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onDownload: () => void;
  onSave: () => void;
  isSaving: boolean;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode, onDownload, onSave, isSaving }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md fixed top-0 left-0 right-0 z-50 px-4 py-3 flex justify-between items-center transition-colors">
      <div className="flex items-center gap-3">
        <LayoutGrid size={24} className="text-blue-600" />
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">Duta RAJA CV v4</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={onSave}
          disabled={isSaving}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 transition-all disabled:opacity-50"
          title="Simpan ke Database"
        >
          <Cloud size={20} className={isSaving ? "animate-pulse text-blue-600" : ""} />
        </button>

        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 transition-all"
        >
          {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
        </button>

        <button 
          onClick={onDownload}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center gap-2 font-bold transition-all shadow-md active:scale-95"
        >
          <Download size={18} />
          <span className="hidden sm:inline text-sm">Simpan PDF</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
