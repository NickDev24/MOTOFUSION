
import React, { useState } from 'react';
import { Distributor } from '../types';

interface DistributorModalProps {
  onClose: () => void;
  onSave: (dist: Partial<Distributor>) => void;
}

const DistributorModal: React.FC<DistributorModalProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<Distributor>>({
    name: '',
    contact: '',
    phone: '',
    category: 'Repuestos',
    debt: 0
  });

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[200] flex items-center justify-center p-4">
      <div className="bg-slate-900 w-full max-w-2xl rounded-[3.5rem] border border-slate-800 p-10 md:p-14 shadow-2xl animate-in zoom-in duration-300">
        <h2 className="text-4xl font-black text-white tracking-tighter mb-10">Nuevo Proveedor</h2>
        
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Empresa / Nombre</label>
            <input 
              required
              className="w-full bg-slate-950 border-2 border-slate-800 p-5 rounded-2xl text-white font-bold outline-none focus:border-blue-500 transition-all"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Persona de Contacto</label>
              <input 
                className="w-full bg-slate-950 border-2 border-slate-800 p-5 rounded-2xl text-white font-bold outline-none"
                value={formData.contact}
                onChange={e => setFormData({...formData, contact: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Teléfono / WhatsApp</label>
              <input 
                className="w-full bg-slate-950 border-2 border-slate-800 p-5 rounded-2xl text-white font-bold outline-none"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Deuda Pendiente ($)</label>
            <input 
              type="number"
              className="w-full bg-red-500/5 border-2 border-red-500/20 p-5 rounded-2xl text-white font-black text-2xl outline-none"
              value={formData.debt}
              onChange={e => setFormData({...formData, debt: parseFloat(e.target.value)})}
            />
          </div>

          <div className="pt-6 flex gap-4">
            <button type="button" onClick={onClose} className="flex-1 py-5 bg-slate-800 text-slate-400 rounded-2xl font-black uppercase text-xs">Cancelar</button>
            <button type="submit" className="flex-[2] py-5 bg-blue-600 text-white rounded-2xl font-black uppercase text-xs shadow-xl shadow-blue-900/20">Guardar Proveedor</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DistributorModal;
