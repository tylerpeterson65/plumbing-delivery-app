export interface Truck { id: string; licensePlate: string; capacity: number; model: string; year: number; }

export interface Driver { id: string; name: string; phone: string; email: string; truck: Truck; status: 'available' | 'on-route' | 'offline'; }

export type DeliveryTimeType = 'specific' | 'window-2hr' | 'am' | 'pm';

export interface DeliveryTime { type: DeliveryTimeType; specificTime?: string; windowStart?: string; windowEnd?: string; }

export interface Delivery { id: string; customerId: string; customerName: string; address: string; phone: string; items: DeliveryItem[]; deliveryTime: DeliveryTime; assignedDriver?: string; status: 'pending' | 'assigned' | 'in-transit' | 'delivered' | 'cancelled'; notes: string; createdAt: Date; }

export interface DeliveryItem { id: string; name: string; quantity: number; unit: string; }