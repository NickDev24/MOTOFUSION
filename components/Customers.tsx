
import React, { useState } from 'react';
import { Division } from '../types';

interface Customer {
  id: string;
  name: string;
  phone: string;
  lastVisit: string;
  motorcycles?: string[];
  totalSpent: number;
  division: Division;
}

const MOCK_CUSTOMERS: Customer[] = [
  { id: '1', name: 'Ricardo Mollo', phone: '11 2233-4455', lastVisit: '2023-10-15', motorcycles: ['KTM Adventure 790'], totalSpent: 150000, division: Division.WORKSHOP },
  { id: '2', name: 'Charly García', phone: '11 9988-7766', lastVisit: '2023-10-20', totalSpent: 45000, division: Division.SPARE_PARTS },
  { id: '3', name: 'Luis Spinetta', phone: '11 5566-7788', lastVisit: '2023-09-30', motorcycles: ['Yamaha MT-03'], totalSpent: 85000, division: Division.WORKSHOP },
];

const Customers: React.FC<{ division: Division }> = ({ division }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'spent'>('spent');
  const isWorkshop = division === Division.WORKSHOP;

  const filtered = MOCK_CUSTOMERS
    .filter(c => c.division === division && c.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'spent') return b.totalSpent - a.totalSpent;
      return 0;
    });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 p-10 md:p-14 rounded-[4rem] border border-slate-800 flex flex-col md:flex-row justify-between items-center gap-10">
          <div>
            <h2 className="text-5xl font-black tracking-tighter text-white">Directorio</h2>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.4em] mt-3">Cartera de clientes de {division}</p>
          </div>
          <button className={`px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest text-white shadow-2xl transition-all hover:scale-105 ${isWorkshop ? 'bg-orange-600' : 'bg-blue-600'}`}>
            + Nuevo Registro
          </button>
        </div>

        <div className="bg-slate-900 p-10 rounded-[4rem] border border-slate-800 flex flex-col justify-center text-center">
          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2">Fidelización</span>
          <span className="text-4xl font-black text-white tracking-tighter">{filtered.length}</span>
          <p className="text-[9px] text-slate-600 font-bold mt-2 uppercase">Clientes recurrentes registrados</p>
        </div>
      </div>

      <div className="bg-slate-900 p-6 md:p-10 rounded-[3.5rem] border border-slate-800">
        <div className="flex flex-col md:flex-row gap-6 mb-12">
          <div className="flex-1 relative">
            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600 text-xl">🔍</span>
            <input
              type="text"
              placeholder="Buscar cliente por nombre o teléfono..."
              className="w-full pl-16 pr-8 py-5 bg-slate-950 border-2 border-slate-800 focus:border-slate-600 rounded-[2.5rem] outline-none transition-all font-bold text-white placeholder:text-slate-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex bg-slate-950 p-1.5 rounded-[2rem] border-2 border-slate-800">
             <button onClick={() => setSortBy('spent')} className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${sortBy === 'spent' ? 'bg-slate-800 text-white' : 'text-slate-600'}`}>Gasto Total</button>
             <button onClick={() => setSortBy('name')} className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${sortBy === 'name' ? 'bg-slate-800 text-white' : 'text-slate-600'}`}>A-Z</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(customer => (
            <div key={customer.id} className="bg-slate-950 p-10 rounded-[3.5rem] border border-slate-800 hover:border-slate-600 transition-all group flex flex-col h-full">
              <div className="flex justify-between items-start mb-10">
                <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center font-black text-2xl text-white shadow-xl ${isWorkshop ? 'bg-orange-600 shadow-orange-900/20' : 'bg-blue-600 shadow-blue-900/20'}`}>
                  {customer.name.charAt(0)}
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest block mb-1">Inversión Total</span>
                  <span className="text-3xl font-black text-white tracking-tighter">${customer.totalSpent.toLocaleString()}</span>
                </div>
              </div>
              
              <h3 className="text-2xl font-black text-white mb-2 tracking-tight group-hover:text-orange-500 transition-colors">{customer.name}</h3>
              <p className="text-slate-500 font-bold text-sm mb-10 tracking-tight">{customer.phone}</p>

              {isWorkshop && customer.motorcycles && (
                <div className="mb-10">
                  <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest block mb-3">Motos Registradas</span>
                  <div className="flex flex-wrap gap-2">
                    {customer.motorcycles.map(moto => (
                      <span key={moto} className="bg-slate-900 px-4 py-2 rounded-xl text-[10px] font-black text-orange-500 border border-orange-500/20 shadow-inner">
                        🏍️ {moto}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-auto pt-8 border-t border-slate-900 flex justify-between items-center">
                <div>
                  <span className="text-[9px] font-black text-slate-700 uppercase tracking-widest block mb-1">Última Actividad</span>
                  <span className="text-xs font-bold text-slate-400">{customer.lastVisit}</span>
                </div>
                <button className="text-slate-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-[0.2em] border border-slate-800 px-4 py-2 rounded-xl hover:bg-slate-900">
                  Detalle Perfil
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-32 border-4 border-dashed border-slate-900 rounded-[4rem]">
            <span className="text-6xl block mb-6">👤</span>
            <p className="text-slate-700 font-black uppercase tracking-[0.2em] text-sm">Sin coincidencias en el directorio</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Customers;
