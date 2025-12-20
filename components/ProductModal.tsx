
import React, { useState } from 'react';
import { Division, Product } from '../types';

interface ProductModalProps {
  division: Division;
  onClose: () => void;
  onSave: (product: Partial<Product>) => void;
  initialData?: Product;
}

const ProductModal: React.FC<ProductModalProps> = ({ division, onClose, onSave, initialData }) => {
  const isWorkshop = division === Division.WORKSHOP;
  const [formData, setFormData] = useState<Partial<Product>>(initialData || {
    name: '',
    sku: '',
    price: 0,
    cost: 0,
    stock: isWorkshop ? 999 : 0,
    category: isWorkshop ? 'Mecánica General' : 'Lubricantes',
    division: division,
    description: '',
    imageUrl: '',
    createdAt: new Date().toISOString()
  });

  const categories = isWorkshop 
    ? ['Mecánica General', 'Chapa y Pintura', 'Electricidad', 'Estética', 'Gomería'] 
    : ['Lubricantes', 'Cubiertas', 'Transmisión', 'Frenos', 'Accesorios', 'Electricidad'];

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-xl z-[200] flex items-center justify-center p-4">
      <div className="bg-slate-900 w-full max-w-4xl rounded-[4rem] border border-slate-800 p-10 md:p-16 shadow-2xl animate-in zoom-in duration-300 overflow-y-auto max-h-[90vh] custom-scrollbar">
        <div className="flex justify-between items-start mb-12">
          <div>
            <h2 className="text-5xl font-black text-white tracking-tighter italic uppercase">
              {initialData ? 'EDITAR' : 'NUEVO'} {isWorkshop ? 'SERVICIO' : 'REPUESTO'}
            </h2>
            <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.4em] mt-3">Gestión de Activos • {division}</p>
          </div>
          <button onClick={onClose} className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-800 text-white text-xl hover:bg-red-500 transition-all">✕</button>
        </div>

        <form className="space-y-10" onSubmit={(e) => { e.preventDefault(); onSave(formData); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Nombre Descriptivo</label>
              <input 
                required
                className="w-full bg-slate-950 border-2 border-slate-800 p-6 rounded-3xl text-white font-bold outline-none focus:border-white/20 transition-all"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">SKU / Identificador Interno</label>
              <input 
                className="w-full bg-slate-950 border-2 border-slate-800 p-6 rounded-3xl text-white font-mono outline-none focus:border-white/20 transition-all"
                value={formData.sku}
                onChange={e => setFormData({...formData, sku: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Costo Neto ($)</label>
              <input 
                type="number"
                className="w-full bg-slate-950 border-2 border-slate-800 p-6 rounded-3xl text-white font-bold outline-none"
                value={formData.cost}
                onChange={e => setFormData({...formData, cost: parseFloat(e.target.value)})}
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Precio Venta ($)</label>
              <input 
                type="number"
                className="w-full bg-slate-950 border-2 border-slate-800 p-6 rounded-3xl text-white font-bold outline-none focus:border-green-500"
                value={formData.price}
                onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Stock Físico</label>
              <input 
                type="number"
                disabled={isWorkshop}
                className="w-full bg-slate-950 border-2 border-slate-800 p-6 rounded-3xl text-white font-bold outline-none disabled:opacity-30"
                value={formData.stock}
                onChange={e => setFormData({...formData, stock: parseInt(e.target.value)})}
              />
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Categoría del Sistema</label>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setFormData({...formData, category: cat})}
                  className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${formData.category === cat ? 'bg-white text-black border-white' : 'bg-slate-950 text-slate-500 border-slate-800'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">URL Imagen Real</label>
            <input 
              className="w-full bg-slate-950 border-2 border-slate-800 p-6 rounded-3xl text-white font-medium outline-none"
              placeholder="https://images.unsplash.com/..."
              value={formData.imageUrl}
              onChange={e => setFormData({...formData, imageUrl: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            className={`w-full py-8 rounded-[2.5rem] font-black text-xl text-white uppercase tracking-[0.2em] shadow-2xl transition-all hover:scale-[1.01] active:scale-95 ${isWorkshop ? 'bg-orange-600 shadow-orange-900/40' : 'bg-blue-600 shadow-blue-900/40'}`}
          >
            {initialData ? 'GUARDAR CAMBIOS' : 'CONFIRMAR CARGA'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
