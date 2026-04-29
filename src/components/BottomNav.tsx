import React from 'react';
import { Edit3, Eye, Download, Settings } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'edit' | 'preview';
  onTabChange: (tab: 'edit' | 'preview') => void;
  onDownload: () => void;
  onLayoutClick: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange, onDownload, onLayoutClick }) => {
  return (
    <nav className="bottom-nav sm:hidden">
      <button 
        onClick={() => onTabChange('edit')}
        className={`nav-item ${activeTab === 'edit' ? 'active' : ''}`}
      >
        <Edit3 />
        <span>Edit</span>
      </button>
      
      <button 
        onClick={() => onTabChange('preview')}
        className={`nav-item ${activeTab === 'preview' ? 'active' : ''}`}
      >
        <Eye />
        <span>Pratinjau</span>
      </button>

      <button 
        onClick={onDownload}
        className="nav-item"
      >
        <Download />
        <span>Unduh</span>
      </button>

      <button 
        onClick={onLayoutClick}
        className="nav-item"
      >
        <Settings />
        <span>Layout</span>
      </button>
    </nav>
  );
};

export default BottomNav;
