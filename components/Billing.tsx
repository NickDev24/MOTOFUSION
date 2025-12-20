
import React, { useState } from 'react';
import { Division, SaleItem } from '../types';
import { dataStore } from '../services/dataStore';

interface BillingProps {
  division: Division;
}

const Billing: React.FC<BillingProps> = ({ division }) => {
  const [items, setItems] = useState<SaleItem[]>([{ description: '', quantity: 1, unitPrice: 0 }]);
  const [client, setClient] = useState('');
  const [method, setMethod] = useState<'Efectivo' | 'Tarjeta' | 'Transferencia'>('Efectivo');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const isWorkshop = division === Division.WORKSHOP;
  const accentColor = isWorkshop ? 'text-[#ff4d00]' : 'text-[#0070f3]';
  const borderColor = isWorkshop ? 'border-[#ff4d00]/30' : 'border-[#0070f3]/30';
  const bgColor = isWorkshop ? 'bg-[#ff4d00]/10' : 'bg-[#0070f3]/10';

  const addItem = () => setItems([...items, { description: '', quantity: 1, unitPrice: 0 }]);
  const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index));
  
  const updateItem = (index: number, field: keyof SaleItem, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const total = items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);

  const handleRegister = () => {
    if (!client || total === 0) {
      alert('Por favor complete el nombre del cliente y agregue productos.');
      return;
    }

    setIsProcessing(true);
    
    const sale = {
      id: Math.random().toString(36).substr(2, 9),
      clientName: client,
      items,
      total,
      method,
      division,
      date: new Date().toISOString()
    };

    setTimeout(() => {
      dataStore.processSale(sale);
      setIsProcessing(false);
      setItems([{ description: '', quantity: 1, unitPrice: 0 }]);
      setClient('');
      alert('Operación exitosa. Stock actualizado y venta registrada.');
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-in fade-in zoom-in duration-500">
      <div className={`bg-slate-900 border-2 ${borderColor} rounded-[3rem] overflow-hidden shadow-2xl relative`}>
        <div className={`h-2 w-full ${isWorkshop ? 'bg-[#ff4d00]' : 'bg-[#0070f3]'} opacity-50`}></div>
        
        <div className="p-8 md:p-14">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
            <div>
              <h2 className={`text-4xl font-moto ${accentColor} tracking-tighter mb-2`}>
                {isWorkshop ? 'REPORTE DE TALLER' : 'ORDEN DE VENTA'}
              </h2>
              <p className="text-slate-500 font-black text-[10px] uppercase tracking-[0.4em]">Moto Fusion Salta • Terminal #01</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Nombre del Cliente</label>
              <input 
                className="w-full bg-slate-950 border-2 border-slate-800 p-5 rounded-2xl text-white font-bold outline-none focus:border-white/20 transition-all" 
                placeholder="Ej: Marcos Pérez" 
                value={client} 
                onChange={e => setClient(e.target.value)} 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Método de Pago</label>
              <div className="flex bg-slate-950 p-1.5 rounded-2xl border-2 border-slate-800">
                {['Efectivo', 'Tarjeta', 'Transferencia'].map(m => (
                  <button 
                    key={m}
                    onClick={() => setMethod(m as any)}
                    className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${method === m ? (isWorkshop ? 'bg-[#ff4d00] text-white shadow-lg' : 'bg-[#0070f3] text-white shadow-lg') : 'text-slate-500'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <div className="hidden md:grid grid-cols-12 px-6 text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">
              <div className="col-span-7">Concepto / Producto en Stock</div>
              <div className="col-span-2 text-center">Cant.</div>
              <div className="col-span-2 text-right">Unitario</div>
              <div className="col-span-1"></div>
            </div>
            
            {items.map((item, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 bg-slate-950 p-6 rounded-3xl border-2 border-slate-900 group hover:border-slate-700 transition-all">
                <div className="col-span-7">
                  <input 
                    className="w-full bg-transparent text-white font-black text-lg outline-none placeholder:text-slate-800" 
                    placeholder="Escriba producto..." 
                    value={item.description} 
                    onChange={e => updateItem(idx, 'description', e.target.value)} 
                  />
                </div>
                <div className="col-span-2 flex justify-center">
                  <input 
                    type="number" 
                    className="w-16 bg-slate-900 text-white rounded-xl text-center p-3 font-bold border border-slate-800" 
                    value={item.quantity} 
                    onChange={e => updateItem(idx, 'quantity', parseInt(e.target.value))} 
                  />
                </div>
                <div className="col-span-2">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 font-bold">$</span>
                    <input 
                      type="number" 
                      className="w-full bg-slate-900 text-white rounded-xl text-right p-3 pr-4 font-bold border border-slate-800" 
                      value={item.unitPrice} 
                      onChange={e => updateItem(idx, 'unitPrice', parseFloat(e.target.value))} 
                    />
                  </div>
                </div>
                <div className="col-span-1 flex justify-end">
                  <button onClick={() => removeItem(idx)} className="text-slate-700 hover:text-red-500 transition-colors">✕</button>
                </div>
              </div>
            ))}
            
            <button 
              onClick={addItem} 
              className={`mt-4 w-full py-4 border-2 border-dashed border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white hover:border-slate-600 transition-all`}
            >
              + AGREGAR ÍTEM ADICIONAL
            </button>
          </div>

          <div className={`p-10 rounded-[2.5rem] ${bgColor} border-2 ${borderColor} flex flex-col md:flex-row justify-between items-center gap-6`}>
            <div className="text-center md:text-left">
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">TOTAL DEL REPORTE</p>
              <p className="text-6xl font-moto text-white tracking-tighter">${total.toLocaleString()}</p>
            </div>
            <button 
              onClick={handleRegister}
              disabled={isProcessing}
              className={`px-12 py-6 rounded-2xl font-moto text-xl text-white uppercase shadow-2xl transition-all hover:scale-105 active:scale-95 disabled:opacity-50 ${isWorkshop ? 'bg-[#ff4d00] shadow-orange-900/40' : 'bg-[#0070f3] shadow-blue-900/40'}`}
            >
              {isProcessing ? 'PROCESANDO...' : 'REGISTRAR CAJA'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
