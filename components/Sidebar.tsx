
import React from 'react';
import { Division } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentDivision: Division;
  setCurrentDivision: (div: Division) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, currentDivision, setCurrentDivision }) => {
  const isWorkshop = currentDivision === Division.WORKSHOP;
  
  const menuItems = [
    { id: 'dashboard', label: 'Tablero Real', icon: '📊' },
    { id: 'stock', label: 'Gestión Stock', icon: '📦' },
    { id: 'quotes', label: 'Bandeja Entrant.', icon: '✉️' },
    { id: 'billing', label: 'Caja & Venta', icon: '💰' },
    { id: 'shop', label: 'Vitrina Web', icon: '🛒' },
    { id: 'distributors', label: 'Cuentas Prov.', icon: '🏢' },
    { id: 'customers', label: 'Directorio', icon: '👥' },
  ];

  return (
    <div className="w-72 bg-[#050505] h-screen border-r border-white/5 p-8 fixed left-0 top-0 z-50 flex flex-col">
      <div className="mb-12 flex flex-col items-center group cursor-pointer" onClick={() => window.location.reload()}>
        <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center font-bold text-2xl text-white shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-700 ${isWorkshop ? 'bg-[#ff4d00] rotate-12' : 'bg-[#0070f3] -rotate-12'}`}>
          MF
        </div>
        <h1 className="mt-5 font-moto text-white text-xs tracking-[0.2em] italic uppercase">MOTO FUSION</h1>
        <div className="mt-2 h-[1px] w-12 bg-white/10"></div>
      </div>

      <div className="mb-10">
        <p className="text-[8px] font-black text-slate-700 uppercase tracking-[0.4em] mb-4 ml-2">Módulo Activo</p>
        <div className="bg-black p-1.5 rounded-[1.5rem] flex flex-col gap-1 border border-white/5 shadow-inner">
          <button 
            onClick={() => setCurrentDivision(Division.WORKSHOP)} 
            className={`flex items-center gap-3 px-6 py-4 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all ${isWorkshop ? 'bg-[#ff4d00] text-black shadow-lg' : 'text-slate-600 hover:text-slate-400'}`}
          >
            🛠️ Taller
          </button>
          <button 
            onClick={() => setCurrentDivision(Division.SPARE_PARTS)} 
            className={`flex items-center gap-3 px-6 py-4 rounded-xl font-black text-[9px] uppercase tracking-widest transition-all ${!isWorkshop ? 'bg-[#0070f3] text-white shadow-lg' : 'text-slate-600 hover:text-slate-400'}`}
          >
            🔩 Repuestera
          </button>
        </div>
      </div>
      
      <nav className="space-y-1.5 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <p className="text-[8px] font-black text-slate-700 uppercase tracking-[0.4em] mb-4 ml-2">Navegación Admin</p>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest group ${
              activeTab === item.id 
                ? (isWorkshop ? 'bg-orange-600/10 text-orange-500' : 'bg-blue-600/10 text-blue-500')
                : 'text-slate-600 hover:bg-white/5 hover:text-slate-300'
            }`}
          >
            <span className={`text-xl transition-transform group-hover:scale-125 ${activeTab === item.id ? 'scale-110' : ''}`}>{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-8 border-t border-white/5">
         <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white border-2 ${isWorkshop ? 'border-orange-500/30' : 'border-blue-500/30'}`}>AD</div>
            <div>
               <p className="text-[9px] font-black text-white uppercase tracking-tighter">Administrador</p>
               <p className="text-[7px] text-slate-500 font-bold uppercase tracking-widest">Sucursal Salta</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Sidebar;
