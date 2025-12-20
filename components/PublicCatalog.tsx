
import React, { useEffect, useState } from 'react';
import { Division, Product } from '../types';
import { dataStore } from '../services/dataStore';

interface PublicCatalogProps {
  division: Division;
  onBack: () => void;
}

const PublicCatalog: React.FC<PublicCatalogProps> = ({ division, onBack }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const isWorkshop = division === Division.WORKSHOP;

  useEffect(() => {
    setProducts(dataStore.getPublishedProducts(division));
  }, [division]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Page Header */}
      <header className="py-24 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-10">
          <div>
            <span className={`text-[10px] font-bold uppercase tracking-[0.5em] ${isWorkshop ? 'text-orange-500' : 'text-blue-500'} mb-4 block`}>
              {isWorkshop ? 'SERVICIOS TÉCNICOS' : 'CATÁLOGO DE REPUESTOS'}
            </span>
            <h1 className="text-5xl md:text-8xl font-moto text-white leading-none">
              NUESTRO <br/> <span className="text-slate-700">STOCK.</span>
            </h1>
          </div>
          <p className="max-w-md text-slate-500 font-medium text-lg text-right">
            Explorá nuestra selección de productos y servicios garantizados para tu motocicleta.
          </p>
        </div>
      </header>

      {/* Grid */}
      <main className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.map(p => (
            <div key={p.id} className="glass rounded-[3rem] overflow-hidden flex flex-col h-full group hover:border-white/10 transition-all">
              <div className="h-72 relative overflow-hidden bg-black/40">
                <img 
                  src={p.imageUrl || 'https://via.placeholder.com/800x600?text=Moto+Fusion+Salta'} 
                  alt={p.name}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                />
                <div className={`absolute top-6 left-6 px-4 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border backdrop-blur-md ${isWorkshop ? 'bg-orange-600/20 text-orange-500 border-orange-500/30' : 'bg-blue-600/20 text-blue-500 border-blue-500/30'}`}>
                  {p.category}
                </div>
              </div>
              
              <div className="p-10 flex flex-col flex-1">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight italic">{p.name}</h3>
                  <p className="text-slate-500 font-medium line-clamp-3">{p.description || 'Detalle disponible bajo consulta directa con nuestros especialistas.'}</p>
                </div>
                
                <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest block mb-1">Precio Sugerido</span>
                    <span className="text-3xl font-bold text-white tracking-tighter">${p.price.toLocaleString()}</span>
                  </div>
                  <a 
                    href={`https://wa.me/543875469174?text=Hola! Me interesa este producto de Moto Fusion: ${p.name}`}
                    target="_blank"
                    className={`w-14 h-14 rounded-xl flex items-center justify-center text-xl text-white shadow-2xl transition-all hover:scale-110 ${isWorkshop ? 'bg-[#ff4d00]' : 'bg-[#0070f3]'}`}
                  >
                    💬
                  </a>
                </div>
              </div>
            </div>
          ))}

          {products.length === 0 && (
            <div className="col-span-full py-40 text-center glass rounded-[4rem] border-dashed border-white/5">
              <p className="text-slate-600 font-bold uppercase tracking-widest text-lg">Próximamente estaremos subiendo nuestro stock aquí.</p>
              <p className="text-slate-800 font-bold uppercase mt-4">Consultanos vía WhatsApp mientras tanto.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PublicCatalog;
