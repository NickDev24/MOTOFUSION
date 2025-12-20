
import React, { useState, useEffect } from 'react';
import { Division, Product } from '../types';
import { dataStore } from '../services/dataStore';
import ProductModal from './ProductModal';

interface InventoryProps {
  division: Division;
}

const Inventory: React.FC<InventoryProps> = ({ division }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);
  
  const isWorkshop = division === Division.WORKSHOP;
  const accentColor = isWorkshop ? 'text-[#ff4d00]' : 'text-[#0070f3]';
  const borderColor = isWorkshop ? 'border-[#ff4d00]/30' : 'border-[#0070f3]/30';

  useEffect(() => {
    setProducts(dataStore.getProducts().filter(p => p.division === division));
  }, [division]);

  const handleSave = (productData: Partial<Product>) => {
    const allProducts = dataStore.getProducts();
    let updated;
    if (editingProduct) {
      updated = allProducts.map(p => p.id === editingProduct.id ? { ...p, ...productData } : p);
    } else {
      const newProduct = {
        ...productData,
        id: Math.random().toString(36).substr(2, 9),
        division,
        createdAt: new Date().toISOString()
      } as Product;
      updated = [newProduct, ...allProducts];
    }
    dataStore.saveProducts(updated);
    setProducts(updated.filter(p => p.division === division));
    setShowModal(false);
    setEditingProduct(undefined);
  };

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalValue: filtered.reduce((acc, p) => acc + (p.cost * (p.stock === 999 ? 0 : p.stock)), 0),
    potentialProfit: filtered.reduce((acc, p) => acc + ((p.price - p.cost) * (p.stock === 999 ? 0 : p.stock)), 0),
    lowStock: filtered.filter(p => p.stock < 5 && p.stock !== 999).length
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {showModal && (
        <ProductModal 
          division={division} 
          onClose={() => { setShowModal(false); setEditingProduct(undefined); }} 
          onSave={handleSave}
          initialData={editingProduct}
        />
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-800 shadow-xl">
           <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Inversión en Stock</p>
           <h3 className="text-4xl font-black text-white tracking-tighter">${stats.totalValue.toLocaleString()}</h3>
        </div>
        <div className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-800 shadow-xl">
           <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Ganancia Potencial</p>
           <h3 className="text-4xl font-black text-green-500 tracking-tighter">${stats.potentialProfit.toLocaleString()}</h3>
        </div>
        <div className={`p-8 rounded-[2.5rem] border ${stats.lowStock > 0 ? 'bg-red-500/10 border-red-500/30' : 'bg-slate-900/50 border-slate-800'} shadow-xl`}>
           <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Alertas de Reposición</p>
           <h3 className={`text-4xl font-black tracking-tighter ${stats.lowStock > 0 ? 'text-red-500' : 'text-white'}`}>{stats.lowStock} <span className="text-sm">Items</span></h3>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-900 p-6 rounded-[2.5rem] border border-slate-800">
        <div className="relative flex-1 w-full">
          <input 
            className="w-full bg-slate-950 border border-slate-800 p-4 pl-12 rounded-2xl text-white font-bold outline-none focus:border-white/20"
            placeholder="Buscar por Nombre o SKU..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600">🔍</span>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className={`px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-white shadow-2xl transition-all hover:scale-105 active:scale-95 ${isWorkshop ? 'bg-[#ff4d00]' : 'bg-[#0070f3]'}`}
        >
          + Agregar {isWorkshop ? 'Servicio' : 'Repuesto'}
        </button>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map(p => (
          <div 
            key={p.id} 
            onClick={() => { setEditingProduct(p); setShowModal(true); }}
            className="bg-slate-950 p-6 rounded-[3rem] border border-slate-900 hover:border-slate-700 transition-all group cursor-pointer overflow-hidden relative"
          >
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-2xl bg-slate-900 overflow-hidden border border-slate-800">
                <img src={p.imageUrl || 'https://via.placeholder.com/150'} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-black text-white group-hover:text-orange-500 transition-colors uppercase italic">{p.name}</h4>
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest mt-1">SKU: {p.sku}</p>
              </div>
            </div>

            <div className="mt-8 flex justify-between items-end">
               <div>
                  <p className="text-[9px] font-black text-slate-700 uppercase tracking-widest mb-1">Precio Venta</p>
                  <p className="text-3xl font-black text-white tracking-tighter">${p.price.toLocaleString()}</p>
               </div>
               <div className={`px-4 py-2 rounded-xl border text-[9px] font-black uppercase ${p.stock < 5 && p.stock !== 999 ? 'border-red-500 text-red-500' : 'border-slate-800 text-slate-500'}`}>
                  {p.stock === 999 ? '∞ DISPONIBLE' : `${p.stock} UNIDADES`}
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
