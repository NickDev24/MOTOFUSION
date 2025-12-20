
export enum Division {
  WORKSHOP = 'Taller',
  SPARE_PARTS = 'Repuestera'
}

export type OrderStatus = 'Pendiente' | 'En Revisión' | 'Presupuestado' | 'Aprobado' | 'En Progreso' | 'Terminado' | 'Entregado';

export interface User {
  id: string;
  name: string;
  role: 'Admin' | 'Mecánico' | 'Vendedor';
  division?: Division;
}

export interface Distributor {
  id: string;
  name: string;
  contact: string;
  phone: string;
  category: string;
  debt: number;
  lastOrderDate: string;
}

export interface Motorcycle {
  brand: string;
  model: string;
  year: number;
  plate: string;
  mileage?: number;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  cost: number;
  stock: number;
  division: Division;
  category: string;
  distributorId: string;
  isPublished?: boolean;
  imageUrl?: string;
  description?: string;
  createdAt: string;
}

export interface QuoteRequest {
  id: string;
  clientName: string;
  phone: string;
  type: Division;
  motorcycle: Motorcycle;
  description: string;
  status: OrderStatus;
  date: string;
  assignedTo?: string; // Mechanic ID
  urgency: 'Normal' | 'Urgente' | 'Emergencia';
}

export interface SaleItem {
  productId?: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Sale {
  id: string;
  clientId: string;
  clientName: string;
  items: SaleItem[];
  total: number;
  method: 'Efectivo' | 'Tarjeta' | 'Transferencia';
  date: string;
  division: Division;
}

// StockOrder interface added to handle procurement orders in dataStore
export interface StockOrder {
  id: string;
  distributorId: string;
  items: SaleItem[];
  total: number;
  status: 'Pendiente' | 'Recibido' | 'Cancelado';
  date: string;
}
