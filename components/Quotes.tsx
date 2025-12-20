
import React, { useState, useEffect } from 'react';
import { QuoteRequest, Division, OrderStatus } from '../types';
import { dataStore } from '../services/dataStore';

interface QuotesProps {
  division: Division;
}

const Quotes: React.FC<QuotesProps> = ({ division }) => {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const isWorkshop = division === Division.WORKSHOP;

  useEffect(() => {
    setQuotes(dataStore.getQuotes().filter(q => q.type === division));
  }, [division]);

  const updateStatus = (id: string, status: OrderStatus) => {
    dataStore.updateQuoteStatus(id, status);
    setQuotes(dataStore.getQuotes().filter(q => q.type === division));
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-5xl font-black tracking-tighter text-white uppercase italic">SOLICITUDES</h2>
          <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.5em] mt-2">Bandeja de entrada • {division}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {quotes.map(quote => (
          <div key={quote.id} className="bg-slate-900/50 p-8 md:p-12 rounded-[4rem] border border-slate-800 relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-2 h-full ${isWorkshop ? 'bg-orange-600' : 'bg-blue-600'}`}></div>
            
            <div className="flex flex-col xl:flex-row justify-between gap-12">
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4">
                  <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${quote.urgency === 'Emergencia' ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-400 border-slate-700'}`}>
                    {quote.urgency}
                  </span>
                  <span className="text-[10px] font-black text-slate-600 uppercase">Recibido: {quote.date}</span>
                </div>

                <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase">{quote.clientName}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-black/40 p-6 rounded-3xl border border-white/5">
                    <p className="text-[9px] font-black text-slate-700 uppercase tracking-widest mb-3">Moto del Cliente</p>
                    <p className="text-2xl font-black text-white italic">{quote.motorcycle.brand} {quote.motorcycle.model}</p>
                    <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-tighter">Año: {quote.motorcycle.year} | Patente: {quote.motorcycle.plate}</p>
                  </div>
                  <div className="bg-black/40 p-6 rounded-3xl border border-white/5">
                    <p className="text-[9px] font-black text-slate-700 uppercase tracking-widest mb-3">Descripción de Falla/Pedido</p>
                    <p className="text-sm font-medium text-slate-300 italic">"{quote.description}"</p>
                  </div>
                </div>
              </div>

              <div className="xl:w-80 flex flex-col gap-4">
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center mb-2">Acciones Rápidas</p>
                 <a 
                   href={`https://wa.me/${quote.phone}?text=Hola ${quote.clientName}, de Moto Fusion Salta te contactamos por tu pedido de ${division}...`}
                   target="_blank"
                   className={`w-full py-5 text-center rounded-2xl font-black text-[11px] uppercase tracking-widest text-white shadow-2xl transition-all hover:scale-[1.03] ${isWorkshop ? 'bg-orange-600 shadow-orange-900/40' : 'bg-blue-600 shadow-blue-900/40'}`}
                 >
                   📱 Enviar WhatsApp
                 </a>
                 <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => updateStatus(quote.id, 'En Revisión')}
                      className="py-4 bg-slate-800 text-white rounded-xl text-[9px] font-black uppercase hover:bg-slate-700 transition-all"
                    >
                      En Box
                    </button>
                    <button 
                      onClick={() => updateStatus(quote.id, 'Entregado')}
                      className="py-4 bg-green-900/20 text-green-500 border border-green-500/20 rounded-xl text-[9px] font-black uppercase hover:bg-green-600 hover:text-white transition-all"
                    >
                      Finalizar
                    </button>
                 </div>
              </div>
            </div>
          </div>
        ))}

        {quotes.length === 0 && (
          <div className="text-center py-40 bg-slate-900/20 rounded-[4rem] border-4 border-dashed border-slate-900">
             <span className="text-6xl mb-6 block opacity-20">🏁</span>
             <p className="text-slate-700 font-black uppercase tracking-widest">No hay solicitudes pendientes en este momento.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quotes;
