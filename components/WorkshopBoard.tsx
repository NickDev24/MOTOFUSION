
import React from 'react';
import { QuoteRequest, OrderStatus } from '../types';

interface WorkshopBoardProps {
  quotes: QuoteRequest[];
  onStatusChange: (id: string, newStatus: OrderStatus) => void;
}

const WorkshopBoard: React.FC<WorkshopBoardProps> = ({ quotes, onStatusChange }) => {
  const columns: { id: OrderStatus; label: string; color: string; icon: string }[] = [
    { id: 'Pendiente', label: 'Ingresadas', color: 'bg-slate-900', icon: '📥' },
    { id: 'En Revisión', label: 'En Box', color: 'bg-orange-600/5', icon: '🔍' },
    { id: 'Presupuestado', label: 'Cotizado', color: 'bg-blue-600/5', icon: '📄' },
    { id: 'Entregado', label: 'Retiro', color: 'bg-green-600/5', icon: '🏁' }
  ];

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'Emergencia': return 'bg-red-600 text-white';
      case 'Urgente': return 'bg-orange-600 text-white';
      default: return 'bg-slate-800 text-slate-400';
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 min-h-[700px] overflow-x-auto pb-8 custom-scrollbar">
      {columns.map(col => (
        <div key={col.id} className={`${col.color} flex-1 min-w-[320px] rounded-[3.5rem] p-8 border border-slate-800/50 flex flex-col gap-8 shadow-2xl`}>
          <div className="flex justify-between items-center px-4">
            <div className="flex items-center gap-3">
               <span className="text-xl">{col.icon}</span>
               <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] italic">{col.label}</h3>
            </div>
            <span className="bg-slate-800 text-slate-400 text-[10px] font-black px-4 py-1.5 rounded-2xl border border-white/5">
              {quotes.filter(q => q.status === col.id).length}
            </span>
          </div>

          <div className="flex-1 space-y-5">
            {quotes.filter(q => q.status === col.id).map(quote => (
              <div 
                key={quote.id} 
                className="bg-slate-950 p-8 rounded-[2.5rem] border border-slate-800 hover:border-[#ff4d00] transition-all cursor-grab active:cursor-grabbing group shadow-xl relative overflow-hidden"
              >
                {quote.urgency === 'Emergencia' && (
                  <div className="absolute top-0 right-0 w-2 h-full bg-red-600 animate-pulse"></div>
                )}
                
                <div className="flex justify-between items-start mb-6">
                  <span className={`text-[8px] font-black uppercase px-3 py-1 rounded-full tracking-widest ${getUrgencyBadge(quote.urgency)}`}>
                    {quote.urgency}
                  </span>
                  <span className="text-[9px] font-mono text-slate-700">ID:{quote.id.slice(-4).toUpperCase()}</span>
                </div>

                <h4 className="text-white font-black text-2xl leading-tight mb-2 group-hover:text-[#ff4d00] transition-colors">{quote.clientName}</h4>
                <p className="text-slate-500 font-bold text-xs uppercase mb-6 flex items-center gap-2">
                   <span className="text-orange-500">🏍️</span> {quote.motorcycle.brand} {quote.motorcycle.model}
                </p>
                
                <div className="bg-white/5 p-4 rounded-2xl mb-6">
                   <p className="text-[10px] text-slate-400 font-medium italic line-clamp-2">"{quote.description}"</p>
                </div>
                
                <div className="pt-6 border-t border-slate-900 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-[10px] font-black text-slate-600 uppercase tracking-widest">
                     📅 {quote.date}
                  </div>
                  <button 
                    onClick={() => {
                      const nextStatus: Record<string, OrderStatus> = { 
                        'Pendiente': 'En Revisión', 
                        'En Revisión': 'Presupuestado', 
                        'Presupuestado': 'Entregado', 
                        'Entregado': 'Pendiente' 
                      };
                      onStatusChange(quote.id, nextStatus[col.id]);
                    }}
                    className="bg-[#ff4d00]/10 text-[#ff4d00] text-[10px] font-black uppercase px-4 py-2 rounded-xl hover:bg-[#ff4d00] hover:text-white transition-all"
                  >
                    AVANZAR →
                  </button>
                </div>
              </div>
            ))}
            
            {quotes.filter(q => q.status === col.id).length === 0 && (
              <div className="h-40 border-2 border-dashed border-slate-800 rounded-[3rem] flex items-center justify-center opacity-20">
                 <span className="text-5xl">📭</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkshopBoard;
