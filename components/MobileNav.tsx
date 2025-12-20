
import React from 'react';

interface MobileNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  items: { id: string; icon: string; label: string }[];
}

const MobileNav: React.FC<MobileNavProps> = ({ activeTab, setActiveTab, items }) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 px-6 py-3 flex justify-between items-center z-[100] pb-8">
      {items.slice(0, 5).map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === item.id ? 'text-orange-500 scale-110' : 'text-slate-500'
          }`}
        >
          <span className="text-xl">{item.icon}</span>
          <span className="text-[8px] font-black uppercase tracking-tighter">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default MobileNav;
