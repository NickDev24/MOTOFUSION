
import React, { useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Division } from '../types';
import { dataStore } from '../services/dataStore';

interface DashboardProps {
  division: Division;
}

const chartData = [
  { name: 'Lunes', valor: 85000 }, { name: 'Martes', valor: 152000 }, { name: 'Miérc.', valor: 338000 },
  { name: 'Jueves', valor: 261000 }, { name: 'Vier.', valor: 489000 }, { name: 'Sáb.', valor: 520000 },
];

const Dashboard: React.FC<DashboardProps> = ({ division }) => {
  const isWorkshop = division === Division.WORKSHOP;
  const themeColor = isWorkshop ? '#ff4d00' : '#0070f3';
  
  const products = dataStore.getProducts().filter(p => p.division === division);
  const quotes = dataStore.getQuotes().filter(q => q.type === division);

  const stats = useMemo(() => ({
    totalStock: products.reduce((acc, p) => acc + (p.stock === 999 ? 0 : p.stock), 0),
    lowStock: products.filter(p => p.stock < 10 && p.division === Division.SPARE_PARTS).length,
    pendingQuotes: quotes.filter(q => q.status === 'Pendiente').length,
    totalValue: products.reduce((acc, p) => acc + (p.cost * (p.stock === 999 ? 1 : p.stock)), 0)
  }), [products, quotes, division]);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      {/* 1. TOP BENTO GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-slate-950 border border-white/5 rounded-[4rem] p-12 md:p-16 relative overflow-hidden group">
          <div className={`absolute top-0 right-0 w-[40rem] h-[40rem] opacity-10 rounded-full blur-[120px] -mr-40 -mt-40 transition-colors duration-1000 ${isWorkshop ? 'bg-orange-600' : 'bg-blue-600'}`}></div>
          
          <div className="relative z-10">
            <span className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.5em] mb-8 block">Estado de Operaciones • {division}</span>
            <h1 className="text-6xl md:text-[8rem] font-moto text-white mb-10 leading-[0.8] tracking-tighter italic uppercase">
              DASHBOARD <br/> <span className={isWorkshop ? 'text-orange-600' : 'text-blue-600'}>REAL-TIME</span>
            </h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 mt-24">
              <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Valor Inventario</p>
                <p className="text-4xl font-black text-white tracking-tighter">${(stats.totalValue / 1000).toFixed(1)}M</p>
              </div>
              <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Pedidos Web</p>
                <p className="text-4xl font-black text-white tracking-tighter">{stats.pendingQuotes} <span className="text-xs text-slate-600">Nuevos</span></p>
              </div>
              <div className="p-6 bg-white/5 rounded-3xl border border-white/5">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Stock Crítico</p>
                <p className={`text-4xl font-black tracking-tighter ${stats.lowStock > 0 ? 'text-red-500' : 'text-white'}`}>{stats.lowStock} <span className="text-xs text-slate-600">Items</span></p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 bg-slate-900 border border-white/5 rounded-[4rem] p-12 flex flex-col justify-center items-center text-center relative overflow-hidden group">
           <div className={`absolute inset-0 opacity-5 transition-transform duration-[20s] linear group-hover:scale-125`}>
              <img src="https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" />
           </div>
           <div className={`w-52 h-52 rounded-full border-8 ${isWorkshop ? 'border-orange-500/10' : 'border-blue-500/10'} flex flex-col items-center justify-center relative bg-black/40 backdrop-blur-md`}>
              <div className={`absolute inset-0 border-8 border-t-transparent ${isWorkshop ? 'border-orange-600' : 'border-blue-600'} rounded-full animate-spin duration-[8s]`}></div>
              <span className="text-7xl font-black text-white italic">94%</span>
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-2">NPS SALTA</span>
           </div>
           <p className="mt-10 text-[10px] font-black text-slate-600 uppercase tracking-[0.4em] relative z-10">Puntuación Clientes</p>
        </div>
      </div>

      {/* 2. CHARTS & LOGS */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2 bg-slate-950 border border-white/5 rounded-[4rem] p-12">
           <div className="flex justify-between items-center mb-16">
              <h3 className="text-3xl font-moto text-white italic tracking-tighter">RENDIMIENTO SEMANAL ($)</h3>
              <div className="bg-green-500/10 text-green-500 text-[9px] font-black px-4 py-2 rounded-full border border-green-500/20">+18.5%</div>
           </div>
           <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="dashboardGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={themeColor} stopOpacity={0.4}/>
                      <stop offset="95%" stopColor={themeColor} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#1a1a1a" />
                  {/* Fixed TS error: removed textTransform from tick object as it's not a valid SVG attribute prop in this context */}
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 9, fill: '#666', fontWeight: 900}} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{backgroundColor: '#000', border: '1px solid #333', borderRadius: '24px', padding: '20px'}}
                    itemStyle={{color: 'white', fontWeight: 900}}
                    cursor={{stroke: themeColor, strokeWidth: 2}}
                  />
                  <Area type="monotone" dataKey="valor" stroke={themeColor} strokeWidth={6} fill="url(#dashboardGrad)" />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="bg-slate-900 border border-white/5 rounded-[4rem] p-12">
           <h3 className="text-3xl font-moto text-white mb-10 italic tracking-tighter uppercase">ALERTAS BOX</h3>
           <div className="space-y-4">
              {[
                { t: 'Moto Lista: Ninja 400', d: 'Box 2 • Cliente: Juan S.', icon: '🏍️', bg: 'bg-green-500/5', c: 'text-green-500' },
                { t: 'Stock: Aceite Motul', d: 'Quedan 2 unidades', icon: '🛢️', bg: 'bg-red-500/5', c: 'text-red-500' },
                { t: 'Pago: Repuestos Centro', d: 'Vence en 2 días: $125k', icon: '🏢', bg: 'bg-blue-500/5', c: 'text-blue-500' },
                { t: 'Turno: Service Tornado', d: 'Mañana 09:30hs', icon: '⏳', bg: 'bg-orange-500/5', c: 'text-orange-500' }
              ].map((log, i) => (
                <div key={i} className={`p-6 rounded-3xl border border-white/5 flex items-start gap-5 transition-all hover:bg-white/5 cursor-pointer ${log.bg}`}>
                   <span className="text-2xl mt-1">{log.icon}</span>
                   <div>
                      <p className={`text-[11px] font-black uppercase tracking-widest ${log.c}`}>{log.t}</p>
                      <p className="text-[9px] text-slate-500 font-bold mt-1 uppercase">{log.d}</p>
                   </div>
                </div>
              ))}
           </div>
           <button className="w-full mt-10 py-6 border-2 border-slate-800 text-slate-500 rounded-3xl font-black text-[9px] uppercase tracking-[0.3em] hover:text-white hover:border-white/20 transition-all">Ver Actividad Histórica</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
