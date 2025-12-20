
import React, { useState } from 'react';
import { Division } from '../types';
import { dataStore } from '../services/dataStore';

interface LandingPageProps {
  onAdminLogin: () => void;
  onNavigate: (view: 'landing' | 'catalog-parts' | 'catalog-services') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onAdminLogin, onNavigate }) => {
  const [submitted, setSubmitted] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState<Division>(Division.WORKSHOP);
  const [formData, setFormData] = useState({ name: '', phone: '', moto: '', year: '', desc: '', urgency: 'Normal' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dataStore.addQuote({
      id: Math.random().toString(36).substr(2, 9),
      clientName: formData.name,
      phone: formData.phone,
      type: selectedDivision,
      motorcycle: { 
        brand: formData.moto.split(' ')[0] || 'Genérica', 
        model: formData.moto || 'Modelo', 
        year: parseInt(formData.year) || 2024, 
        plate: '' 
      },
      description: formData.desc,
      status: 'Pendiente',
      urgency: formData.urgency as any,
      date: new Date().toISOString().split('T')[0]
    });
    setSubmitted(true);
  };

  return (
    <div className="animate-in fade-in duration-1000">
      {/* 1. HERO REFINADO */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1558981285-6f0c94958bb6?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-30 scale-105 animate-pulse-slow"
            alt="Moto garage industrial"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-4 bg-orange-600/10 border border-orange-500/20 px-6 py-2 rounded-full mb-10">
             <span className="w-2 h-2 bg-orange-500 rounded-full animate-ping"></span>
             <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.4em]">Box Abierto • Salta Capital</span>
          </div>
          
          <h2 className="text-5xl md:text-[10rem] font-moto text-white leading-[0.85] mb-12 italic tracking-tighter uppercase">
            MÁXIMO <br className="hidden md:block" /> <span className="text-orange-600">RUGIDO.</span>
          </h2>
          
          <p className="text-slate-400 text-lg md:text-2xl font-bold max-w-2xl mx-auto mb-16 leading-relaxed">
            Mecánica integral y repuestos originales. Mantené tu máquina lista para la ruta con los especialistas del NOA.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button 
              onClick={() => onNavigate('catalog-services')}
              className="px-12 py-6 bg-[#ff4d00] text-black font-black rounded-2xl text-[11px] uppercase tracking-widest hover:bg-white transition-all shadow-[0_20px_40px_rgba(255,77,0,0.2)]"
            >
              🚀 Solicitar Turno Taller
            </button>
            <button 
              onClick={() => onNavigate('catalog-parts')}
              className="px-12 py-6 glass text-white font-black rounded-2xl text-[11px] uppercase tracking-widest hover:bg-white hover:text-black transition-all"
            >
              🔩 Buscar Repuestos
            </button>
          </div>
        </div>
      </section>

      {/* 2. SERVICES PREVIEW (Grid Visual) */}
      <section className="py-32 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="group relative h-[600px] rounded-[4rem] overflow-hidden border border-white/5">
           <img src="https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=1200" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-1000" />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-16 flex flex-col justify-end">
              <span className="text-orange-500 font-black text-[10px] uppercase tracking-widest mb-4">División Mecánica</span>
              <h3 className="text-6xl font-moto text-white mb-8 italic uppercase leading-none">EL TALLER</h3>
              <p className="text-slate-400 text-lg font-bold mb-10 max-w-sm">Chapa, pintura, motor, suspensión y diagnóstico por computadora.</p>
              <button onClick={() => onNavigate('catalog-services')} className="w-fit px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-white hover:text-black transition-all">Ver Servicios</button>
           </div>
        </div>
        <div className="group relative h-[600px] rounded-[4rem] overflow-hidden border border-white/5">
           <img src="https://images.unsplash.com/photo-1558981403-c5f91cbba527?auto=format&fit=crop&q=80&w=1200" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-1000" />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-16 flex flex-col justify-end">
              <span className="text-blue-500 font-black text-[10px] uppercase tracking-widest mb-4">División Stock</span>
              <h3 className="text-6xl font-moto text-white mb-8 italic uppercase leading-none">REPUESTOS</h3>
              <p className="text-slate-400 text-lg font-bold mb-10 max-w-sm">Cubiertas, transmisión, aceites y accesorios de primeras marcas mundiales.</p>
              <button onClick={() => onNavigate('catalog-parts')} className="w-fit px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-white hover:text-black transition-all">Ver Catálogo</button>
           </div>
        </div>
      </section>

      {/* 3. BUDGET FORM (Optimizado) */}
      <section className="py-32 px-6 bg-white rounded-t-[5rem]">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#050505] p-8 md:p-20 rounded-[4rem] shadow-[0_50px_100px_rgba(0,0,0,0.3)] relative overflow-hidden">
             <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600/10 blur-[150px] -mr-48 -mt-48"></div>
             
             <div className="relative z-10">
               <div className="text-center mb-16">
                 <h3 className="font-moto text-5xl text-white mb-6 italic">SOLICITUD DIGITAL</h3>
                 <p className="text-slate-500 font-black text-[10px] uppercase tracking-[0.5em]">Tu presupuesto en menos de 60 minutos</p>
                 
                 <div className="flex justify-center mt-12 bg-black p-2 rounded-2xl w-fit mx-auto border border-white/5">
                   <button 
                    onClick={() => setSelectedDivision(Division.WORKSHOP)}
                    className={`px-10 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedDivision === Division.WORKSHOP ? 'bg-[#ff4d00] text-black' : 'text-slate-600'}`}
                   >
                     Taller
                   </button>
                   <button 
                    onClick={() => setSelectedDivision(Division.SPARE_PARTS)}
                    className={`px-10 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${selectedDivision === Division.SPARE_PARTS ? 'bg-blue-600 text-white' : 'text-slate-600'}`}
                   >
                     Repuestos
                   </button>
                 </div>
               </div>

               {submitted ? (
                 <div className="text-center py-20 animate-in zoom-in duration-500">
                   <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-10 text-white text-5xl shadow-2xl">✓</div>
                   <h4 className="font-moto text-3xl text-white mb-4 italic uppercase">¡SOLICITUD ENVIADA!</h4>
                   <p className="text-slate-400 text-lg mb-12">Un asesor de Salta se comunicará por WhatsApp en breve.</p>
                   <button onClick={() => setSubmitted(false)} className="text-orange-500 font-black uppercase text-[10px] tracking-widest hover:text-white transition-colors">Enviar otra consulta</button>
                 </div>
               ) : (
                 <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Nombre Completo</label>
                        <input required className="w-full bg-black/60 border border-white/10 p-6 rounded-3xl text-white font-bold outline-none focus:border-[#ff4d00] transition-all" placeholder="Ej: Juan Pérez" onChange={e => setFormData({...formData, name: e.target.value})} />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">WhatsApp (Con Código)</label>
                        <input required className="w-full bg-black/60 border border-white/10 p-6 rounded-3xl text-white font-bold outline-none focus:border-[#ff4d00] transition-all" placeholder="387 123 4567" onChange={e => setFormData({...formData, phone: e.target.value})} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Moto y Modelo</label>
                        <input required className="w-full bg-black/60 border border-white/10 p-5 rounded-2xl text-white font-bold outline-none" placeholder="Honda Tornado 250" onChange={e => setFormData({...formData, moto: e.target.value})} />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Año</label>
                        <input type="number" className="w-full bg-black/60 border border-white/10 p-5 rounded-2xl text-white font-bold outline-none" placeholder="2022" onChange={e => setFormData({...formData, year: e.target.value})} />
                      </div>
                      <div className="space-y-3">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Prioridad</label>
                        <select className="w-full bg-black/60 border border-white/10 p-5 rounded-2xl text-white font-bold outline-none appearance-none" onChange={e => setFormData({...formData, urgency: e.target.value})}>
                          <option value="Normal">Normal</option>
                          <option value="Urgente">Urgente</option>
                          <option value="Emergencia">Emergencia</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Contanos el Problema</label>
                      <textarea required rows={4} className="w-full bg-black/60 border border-white/10 p-6 rounded-3xl text-white font-medium outline-none focus:border-[#ff4d00] transition-all resize-none" placeholder="Ej: No arranca, service 10k, cubiertas..." onChange={e => setFormData({...formData, desc: e.target.value})}></textarea>
                    </div>
                    
                    <button className={`w-full py-7 rounded-[2.5rem] font-black text-xl text-white uppercase tracking-widest transition-all active:scale-95 shadow-2xl ${selectedDivision === Division.WORKSHOP ? 'bg-[#ff4d00] shadow-orange-900/30' : 'bg-blue-600 shadow-blue-900/30'}`}>
                      {selectedDivision === Division.WORKSHOP ? '🚀 Solicitar Presupuesto Taller' : '🔍 Consultar Stock Repuestos'}
                    </button>
                 </form>
               )}
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
