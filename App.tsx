
import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import PublicCatalog from './components/PublicCatalog';
import PublicLayout from './components/PublicLayout';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import Dashboard from './components/Dashboard';
import Inventory from './components/Inventory';
import Quotes from './components/Quotes';
import Billing from './components/Billing';
import ShopManager from './components/ShopManager';
import Customers from './components/Customers';
import Distributors from './components/Distributors';
import { Division } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'catalog-parts' | 'catalog-services' | 'admin'>('landing');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentDivision, setCurrentDivision] = useState<Division>(Division.WORKSHOP);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view, activeTab]);

  const menuItems = [
    { id: 'dashboard', label: 'Inicio', icon: '📊' },
    { id: 'stock', label: 'Stock', icon: '📦' },
    { id: 'distributors', label: 'Proveedores', icon: '🏢' },
    { id: 'quotes', label: 'Pedidos', icon: '📝' },
    { id: 'billing', label: 'Caja', icon: '💰' },
    { id: 'shop', label: 'Tienda', icon: '🛒' },
    { id: 'customers', label: 'Clientes', icon: '👥' },
  ];

  // Admin View Wrapper
  if (view === 'admin') {
    const renderAdminContent = () => {
      switch (activeTab) {
        case 'dashboard': return <Dashboard division={currentDivision} />;
        case 'stock': return <Inventory division={currentDivision} />;
        case 'distributors': return <Distributors division={currentDivision} />;
        case 'quotes': return <Quotes division={currentDivision} />;
        case 'billing': return <Billing division={currentDivision} />;
        case 'shop': return <ShopManager division={currentDivision} />;
        case 'customers': return <Customers division={currentDivision} />;
        default: return <Dashboard division={currentDivision} />;
      }
    };

    return (
      <div className="min-h-screen bg-black text-slate-200">
        <div className="hidden md:block">
          <Sidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            currentDivision={currentDivision} 
            setCurrentDivision={setCurrentDivision} 
          />
        </div>
        
        <main className="md:pl-72 min-h-screen">
          <header className="glass h-20 border-b border-white/5 flex items-center justify-between px-6 md:px-10 sticky top-0 z-40">
             <div className="flex items-center gap-4">
                <h2 className="text-lg font-moto text-white capitalize">{activeTab}</h2>
                <div className={`px-4 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest border ${currentDivision === Division.WORKSHOP ? 'border-orange-500/30 text-orange-500' : 'border-blue-500/30 text-blue-500'}`}>
                  {currentDivision}
                </div>
             </div>
             <div className="flex items-center gap-4">
                <button 
                  onClick={() => setView('landing')} 
                  className="text-[10px] font-bold text-slate-500 border border-white/5 px-4 py-2 rounded-xl hover:text-white transition-all"
                >
                  Cerrar Sesión
                </button>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm ${currentDivision === Division.WORKSHOP ? 'bg-[#ff4d00]' : 'bg-[#0070f3]'}`}>AD</div>
             </div>
          </header>

          <div className="p-6 md:p-12 max-w-7xl mx-auto">
            {renderAdminContent()}
          </div>
        </main>

        <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} items={menuItems} />
      </div>
    );
  }

  // Public View Router
  return (
    <PublicLayout 
      onAdminLogin={() => setView('admin')} 
      onNavigate={(v) => setView(v)}
    >
      {view === 'landing' && (
        <LandingPage 
          onAdminLogin={() => setView('admin')} 
          onNavigate={(v) => setView(v)} 
        />
      )}
      {(view === 'catalog-parts' || view === 'catalog-services') && (
        <PublicCatalog 
          division={view === 'catalog-parts' ? Division.SPARE_PARTS : Division.WORKSHOP} 
          onBack={() => setView('landing')} 
        />
      )}
    </PublicLayout>
  );
};

export default App;
