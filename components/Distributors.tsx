
import React, { useState, useEffect } from 'react';
import { Distributor, Division } from '../types';
import { dataStore } from '../services/dataStore';
import DistributorModal from './DistributorModal';

const Distributors: React.FC<{ division: Division }> = ({ division }) => {
  const [distributors, setDistributors] = useState<Distributor[]>([]);
  const [sortBy, setSortBy] = useState<'name' | 'debt-desc'>('name');
  const [showModal, setShowModal] = useState(false);
  const isWorkshop = division === Division.WORKSHOP;

  useEffect(() => {
    setDistributors(dataStore.getDistributors());
  }, []);

  const handleSave = (distData: Partial<Distributor>) => {
    const allDist = dataStore.getDistributors();
    const newDist = {
      ...distData,
      id: Math.random().toString(36).substr(2, 9),
      lastOrderDate: new Date().toISOString().split('T')[0]
    } as Distributor;
    const updated = [newDist, ...allDist];
    setDistributors(updated);
    dataStore.saveDistributors(updated);
    setShowModal(false);
  };

  const totalDebt = distributors.reduce((acc, d) => acc + d.debt, 0);

  const sorted = [...distributors].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'debt-desc') return b.debt - a.debt;
    return 0;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {showModal && (
        <DistributorModal 
          onClose={() => setShowModal(false)} 
          onSave={handleSave} 
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 p-10 rounded-[3rem] border border-slate-800 flex flex-col justify-between">
          <div>
            <h2 className="text-5xl font-black tracking-tighter text-white">Proveedores</h2>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-2">Directorios y Cuentas Corrientes</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="mt-8 w-fit bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:bg-orange-600 hover:text-white transition-all"
          >
            + Nuevo Proveedor
          </button>
        </div>

        <div className="bg-red-500/10 border-2 border-red-500/20 p-10 rounded-[3rem] flex flex-col justify-center">
          <span className="text-[10px] font-black text-red-500 uppercase tracking-widest block mb-2">Saldo Total Adeudado</span>
          <span className="text-5xl font-black text-white tracking-tighter">${totalDebt.toLocaleString()}</span>
          <p className="text-slate-600 font-bold text-xs mt-3 uppercase">Pagas pendientes a distribuidores</p>
        </div>
      </div>

      <div className="flex gap-2 bg-slate-900 p-2 rounded-[2rem] border border-slate-800 w-fit">
        <button 
          onClick={() => setSortBy('name')}
          className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${sortBy === 'name' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300'}`}
        >
          🔠 Alfabético
        </button>
        <button 
          onClick={() => setSortBy('debt-desc')}
          className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${sortBy === 'debt-desc' ? 'bg-red-500/20 text-red-500' : 'text-slate-500 hover:text-slate-300'}`}
        >
          💰 Mayor Deuda
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sorted.map(d => (
          <div key={d.id} className="bg-slate-900 p-10 rounded-[3rem] border border-slate-800 hover:border-slate-700 transition-all flex flex-col h-full group">
            <div className="flex justify-between items-start mb-10">
              <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center text-3xl border border-slate-800 group-hover:bg-slate-900 transition-colors">
                🏢
              </div>
              {d.debt > 0 && (
                <div className="flex flex-col items-end">
                  <span className="bg-red-600 text-white text-[8px] font-black uppercase px-4 py-1.5 rounded-full tracking-[0.2em] shadow-lg shadow-red-900/20">Pago Pendiente</span>
                </div>
              )}
            </div>
            
            <h3 className="text-3xl font-black text-white mb-2 tracking-tight">{d.name}</h3>
            <span className="text-xs font-black text-slate-500 uppercase tracking-widest mb-10">{d.category}</span>

            <div className="space-y-4 mb-12">
              <div className="flex justify-between items-center py-3 border-b border-slate-800/50">
                <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Responsable</span>
                <span className="text-white font-bold">{d.contact}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-800/50">
                <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest">WhatsApp</span>
                <span className="text-white font-bold">{d.phone}</span>
              </div>
            </div>

            <div className="mt-auto pt-8 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest block mb-1">Tu Saldo</span>
                <span className={`text-2xl font-black ${d.debt > 0 ? 'text-red-500' : 'text-green-500'}`}>
                  ${d.debt.toLocaleString()}
                </span>
              </div>
              <button className={`p-4 rounded-xl text-white ${isWorkshop ? 'bg-orange-600/10 text-orange-500' : 'bg-blue-600/10 text-blue-500'} hover:scale-110 transition-transform`}>
                📁
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Distributors;
