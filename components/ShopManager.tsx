
import React, { useState, useEffect } from 'react';
import { Division, Product } from '../types';
import { dataStore } from '../services/dataStore';

interface ShopManagerProps {
  division: Division;
}

const ShopManager: React.FC<ShopManagerProps> = ({ division }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const isWorkshop = division === Division.WORKSHOP;
  const accentColor = isWorkshop ? 'text-[#ff4d00]' : 'text-[#0070f3]';
  const bgColor = isWorkshop ? 'bg-[#ff4d00]' : 'bg-[#0070f3]';

  useEffect(() => {
    setProducts(dataStore.getProducts());
  }, []);

  const togglePublish = (id: string) => {
    const updated = products.map(p => p.id === id ? { ...p, isPublished: !p.isPublished } : p);
    setProducts(updated);
    dataStore.saveProducts(updated);
  };

  const filtered = products.filter(p => p.division === division);

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em] mb-3 block">Vitrina Digital</span>
          <h2 className={`text-5xl font-moto text-white`}>MOSTRADOR <span className={accentColor}>ONLINE</span></h2>
        </div>
        <div className="bg-slate-900 p-2 rounded-2xl border-2 border-slate-800 flex gap-4">
           <div className="px-6 py-4 text-center">
              <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest block">Total</span>
              <span className="text-xl font-black text-white">{filtered.length}</span>
           </div>
           <div className="px-6 py-4 text-center border-l border-slate-800">
              <span className="text-[8px] font-black text-slate-600 uppercase tracking-widest block">Publicados</span>
              <span className="text-xl font-black text-green-500">{filtered.filter(p => p.isPublished).length}</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {filtered.map((product) => (
          <div key={product.id} className="bg-slate-950 rounded-[3rem] overflow-hidden border-2 border-slate-900 group relative transition-all hover:border-slate-700">
            <div className="h-64 relative overflow-hidden bg-slate-900">
              <img 
                src={product.imageUrl || `https://images.unsplash.com/photo-1558981403-c5f91cbba527?auto=format&fit=crop&q=80&w=800`} 
                alt={product.name} 
                className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
              
              <div className="absolute top-6 left-6">
                <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-2xl backdrop-blur-md ${
                  product.isPublished ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-red-500/20 text-red-400 border-red-500/30'
                }`}>
                  {product.isPublished ? '● EN VITRINA' : '○ EN DEPÓSITO'}
                </div>
              </div>
            </div>

            <div className="p-10">
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-white leading-tight mb-2 uppercase italic">{product.name}</h3>
                  <span className="bg-slate-900 px-3 py-1 rounded-lg text-[9px] font-black text-slate-600 uppercase tracking-tighter">SKU: {product.sku}</span>
                </div>
              </div>

              <p className="text-slate-500 text-sm font-medium line-clamp-2 mb-10 h-10">
                {product.description || 'Consulta detalles técnicos vía WhatsApp con nuestros expertos de Salta.'}
              </p>

              <div className="flex items-center justify-between gap-6">
                <div>
                   <p className="text-[9px] font-black text-slate-700 uppercase tracking-widest mb-1">PVP Sugerido</p>
                   <p className="text-3xl font-black text-white tracking-tighter">${product.price.toLocaleString()}</p>
                </div>
                <button 
                  onClick={() => togglePublish(product.id)}
                  className={`px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
                    product.isPublished 
                    ? 'bg-slate-900 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white' 
                    : `${bgColor} text-white shadow-xl shadow-slate-900/40 hover:scale-105`
                  }`}
                >
                  {product.isPublished ? 'Ocultar' : 'Publicar'}
                </button>
              </div>
            </div>
          </div>
        ))}

        <button className="border-4 border-dashed border-slate-900 rounded-[3rem] p-12 flex flex-col items-center justify-center text-slate-700 hover:text-slate-500 hover:border-slate-800 transition-all gap-6 group">
           <div className="w-20 h-20 rounded-full border-4 border-current flex items-center justify-center text-4xl group-hover:rotate-90 transition-transform">
              +
           </div>
           <span className="font-moto text-sm tracking-widest">SUBIR NUEVO ARTÍCULO</span>
        </button>
      </div>
    </div>
  );
};

export default ShopManager;
