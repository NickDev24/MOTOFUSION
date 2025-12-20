
import { Product, QuoteRequest, Division, Distributor, StockOrder } from '../types';

const PRODUCTS_KEY = 'moto_fusion_products';
const QUOTES_KEY = 'moto_fusion_quotes';
const DISTRIBUTORS_KEY = 'moto_fusion_distributors';

const INITIAL_PRODUCTS: Product[] = [
  // --- REPUESTOS (Division.SPARE_PARTS) ---
  { id: 'p1', name: 'Aceite Motul 7100 10W40 1L', sku: 'MOT-7100-1040', price: 28500, cost: 21000, stock: 45, division: Division.SPARE_PARTS, category: 'Lubricantes', distributorId: '1', isPublished: true, imageUrl: 'https://images.unsplash.com/photo-1635816309802-602970a25696?q=80&w=800', description: 'Lubricante 100% sintético con tecnología Ester para máxima protección del motor.', createdAt: new Date().toISOString() },
  { id: 'p2', name: 'Cubierta Pirelli Diablo Rosso IV', sku: 'PIR-DR4-180', price: 245000, cost: 195000, stock: 4, division: Division.SPARE_PARTS, category: 'Cubiertas', distributorId: '2', isPublished: true, imageUrl: 'https://images.unsplash.com/photo-1591439657448-9f4b90798e85?q=80&w=800', description: 'El neumático deportivo definitivo para uso en carretera y pista.', createdAt: new Date().toISOString() },
  { id: 'p3', name: 'Kit Transmisión DID Japonesa 520', sku: 'DID-JP-520', price: 115000, cost: 85000, stock: 12, division: Division.SPARE_PARTS, category: 'Transmisión', distributorId: '1', isPublished: true, imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f91cbba527?q=80&w=800', description: 'Cadena reforzada con O-Rings dorados. Incluye piñón y corona de acero.', createdAt: new Date().toISOString() },
  { id: 'p4', name: 'Batería Yuasa YTX9-BS', sku: 'YUA-YTX9', price: 92000, cost: 68000, stock: 8, division: Division.SPARE_PARTS, category: 'Electricidad', distributorId: '1', isPublished: true, imageUrl: 'https://images.unsplash.com/photo-1620216518970-5d070183060c?q=80&w=800', description: 'Batería de alto rendimiento libre de mantenimiento para motos de alta cilindrada.', createdAt: new Date().toISOString() },
  { id: 'p5', name: 'Escape Akrapovic Slip-On Carbono', sku: 'AKRA-S1000', price: 1850000, cost: 1450000, stock: 2, division: Division.SPARE_PARTS, category: 'Accesorios', distributorId: '1', isPublished: true, imageUrl: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800', description: 'Sistema de escape de fibra de carbono homologado para competición.', createdAt: new Date().toISOString() },

  // --- SERVICIOS TALLER (Division.WORKSHOP) ---
  { id: 's1', name: 'Service Integral 10.000km', sku: 'SRV-10K', price: 45000, cost: 12000, stock: 999, division: Division.WORKSHOP, category: 'Mecánica General', distributorId: '0', isPublished: true, imageUrl: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?q=80&w=800', description: 'Cambio de filtros, aceite, regulación de válvulas y escaneo computarizado.', createdAt: new Date().toISOString() },
  { id: 's2', name: 'Pintura Completa (Tanque y Cachas)', sku: 'SRV-PINT', price: 180000, cost: 65000, stock: 999, division: Division.WORKSHOP, category: 'Chapa y Pintura', distributorId: '0', isPublished: true, imageUrl: 'https://images.unsplash.com/photo-1597892657493-6847b9640bac?q=80&w=800', description: 'Pintura bi-capa con acabado en horno. Incluye tratamiento cerámico.', createdAt: new Date().toISOString() },
  { id: 's3', name: 'Diagnóstico Eléctrico Avanzado', sku: 'SRV-ELEC', price: 25000, cost: 0, stock: 999, division: Division.WORKSHOP, category: 'Electricidad', distributorId: '0', isPublished: true, imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800', description: 'Detección de fallas en sensores, alternador y sistema de encendido.', createdAt: new Date().toISOString() },
  { id: 's4', name: 'Restauración de Chasis y Arenado', sku: 'SRV-CHAS', price: 220000, cost: 80000, stock: 999, division: Division.WORKSHOP, category: 'Chapa y Pintura', distributorId: '0', isPublished: true, imageUrl: 'https://images.unsplash.com/photo-1621360241104-790176597950?q=80&w=800', description: 'Eliminación de óxido, arenado y pintura epoxi al horno.', createdAt: new Date().toISOString() },
  { id: 's5', name: 'Limpieza Inyectores por Ultrasonido', sku: 'SRV-INJ', price: 18000, cost: 2000, stock: 999, division: Division.WORKSHOP, category: 'Mecánica General', distributorId: '0', isPublished: true, imageUrl: 'https://images.unsplash.com/photo-1558981403-c5f91cbba527?q=80&w=800', description: 'Limpieza profunda de cuerpo de inyección para optimizar consumo.', createdAt: new Date().toISOString() }
];

export const dataStore = {
  getProducts: (): Product[] => {
    const data = localStorage.getItem(PRODUCTS_KEY);
    if (!data) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(data);
  },
  saveProducts: (products: Product[]) => localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products)),
  
  getDistributors: (): Distributor[] => {
    const data = localStorage.getItem(DISTRIBUTORS_KEY);
    return data ? JSON.parse(data) : [
      { id: '1', name: 'Distribuidora Salta Moto', contact: 'Juan Carlos', phone: '387 544-2211', category: 'General', debt: 125000, lastOrderDate: '2024-03-01' },
      { id: '2', name: 'Pirelli Oficial NOA', contact: 'Esteban', phone: '387 611-0099', category: 'Neumáticos', debt: 450000, lastOrderDate: '2024-02-28' }
    ];
  },
  saveDistributors: (d: Distributor[]) => localStorage.setItem(DISTRIBUTORS_KEY, JSON.stringify(d)),

  getPublishedProducts: (division?: Division) => {
    return dataStore.getProducts().filter(p => p.isPublished && (division ? p.division === division : true));
  },

  getQuotes: (): QuoteRequest[] => {
    const data = localStorage.getItem(QUOTES_KEY);
    return data ? JSON.parse(data) : [
      { id: 'q1', clientName: 'Ricardo Mollo', phone: '3875469174', type: Division.WORKSHOP, motorcycle: { brand: 'BMW', model: 'R1250GS', year: 2023, plate: 'AF123JK' }, description: 'Service de los 1000km y pintura de protectores.', status: 'En Revisión', date: '2024-03-20', urgency: 'Normal' }
    ];
  },
  addQuote: (quote: QuoteRequest) => {
    const quotes = dataStore.getQuotes();
    localStorage.setItem(QUOTES_KEY, JSON.stringify([quote, ...quotes]));
  },
  updateQuoteStatus: (id: string, status: any) => {
    const quotes = dataStore.getQuotes();
    const updated = quotes.map(q => q.id === id ? { ...q, status } : q);
    localStorage.setItem(QUOTES_KEY, JSON.stringify(updated));
  },

  processSale: (sale: any) => {
    const products = dataStore.getProducts();
    const updatedProducts = products.map(p => {
      const soldItem = sale.items.find((si: any) => si.description === p.name);
      if (soldItem && p.division === Division.SPARE_PARTS) {
        return { ...p, stock: Math.max(0, p.stock - soldItem.quantity) };
      }
      return p;
    });
    dataStore.saveProducts(updatedProducts);
    const sales = JSON.parse(localStorage.getItem('moto_fusion_sales') || '[]');
    localStorage.setItem('moto_fusion_sales', JSON.stringify([...sales, sale]));
  }
};
