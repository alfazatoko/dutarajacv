import React, { useState, useEffect } from 'react';
import { Crosshair, X } from 'lucide-react';

interface DevOverlayProps {
  onSelect: (element: HTMLElement) => void;
}

const DevOverlay: React.FC<DevOverlayProps> = ({ onSelect }) => {
  const [active, setActive] = useState(false);
  const [hoveredEl, setHoveredEl] = useState<HTMLElement | null>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);

  useEffect(() => {
    if (!active) {
      setHoveredEl(null);
      setRect(null);
      return;
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.dev-overlay-ignore')) return;
      setHoveredEl(target);
      setRect(target.getBoundingClientRect());
    };

    const handleClick = (e: MouseEvent) => {
      if (!active) return;
      const target = e.target as HTMLElement;
      if (target.closest('.dev-overlay-ignore')) return;
      
      e.preventDefault();
      e.stopPropagation();
      onSelect(target);
      setActive(false);
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('click', handleClick, true);
    };
  }, [active, onSelect]);

  return (
    <div className="dev-overlay-ignore">
      <button 
        onClick={() => setActive(!active)}
        className={`fixed bottom-24 right-8 z-[9999] p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center gap-2 font-bold uppercase tracking-widest text-xs ${
          active ? 'bg-red-600 text-white animate-pulse' : 'bg-blue-600 text-white hover:scale-110'
        }`}
      >
        {active ? <X size={20}/> : <Crosshair size={20}/>}
        <span>{active ? 'Batal Pilih' : 'Pilih Elemen Edit'}</span>
      </button>

      {active && rect && (
        <div 
          style={{
            position: 'fixed',
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            border: '2px solid #2563eb',
            backgroundColor: 'rgba(37, 99, 235, 0.1)',
            pointerEvents: 'none',
            zIndex: 9998,
            transition: 'all 0.1s ease-out'
          }}
        >
          <div className="absolute -top-6 left-0 bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap font-mono">
            {hoveredEl?.tagName.toLowerCase()}
            {hoveredEl?.id ? `#${hoveredEl.id}` : ''}
            {hoveredEl?.className ? `.${hoveredEl.className.split(' ')[0]}` : ''}
          </div>
        </div>
      )}
    </div>
  );
};

export default DevOverlay;
