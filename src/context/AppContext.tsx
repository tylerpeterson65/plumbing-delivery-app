import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Driver, Delivery, Truck } from '../types';

interface AppContextType {
  drivers: Driver[];
  deliveries: Delivery[];
  addDriver: (driver: Driver) => void;
  updateDriver: (id: string, driver: Partial<Driver>) => void;
  deleteDriver: (id: string) => void;
  addDelivery: (delivery: Delivery) => void;
  updateDelivery: (id: string, delivery: Partial<Delivery>) => void;
  deleteDelivery: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [drivers, setDrivers] = useState<Driver[]>([
    {
      id: '1',
      name: 'John Smith',
      phone: '555-0101',
      email: 'john@plumbing.com',
      status: 'available',
      truck: {
        id: 't1',
        licensePlate: 'PLD-2024',
        capacity: 500,
        model: 'Ford Transit',
        year: 2024,
      },
    },
    {
      id: '2',
      name: 'Mike Johnson',
      phone: '555-0102',
      email: 'mike@plumbing.com',
      status: 'on-route',
      truck: {
        id: 't2',
        licensePlate: 'PLD-2023',
        capacity: 450,
        model: 'Chevy Express',
        year: 2023,
      },
    },
    {
      id: '3',
      name: 'Sarah Davis',
      phone: '555-0103',
      email: 'sarah@plumbing.com',
      status: 'available',
      truck: {
        id: 't3',
        licensePlate: 'PLD-2025',
        capacity: 550,
        model: 'Mercedes Sprinter',
        year: 2025,
      },
    },
  ]);

  const [deliveries, setDeliveries] = useState<Delivery[]>([
    {
      id: 'd1',
      customerId: 'c1',
      customerName: 'ABC Plumbing Supply',
      address: '123 Main St',
      phone: '555-1234',
      items: [{ id: 'i1', name: 'PVC Pipes', quantity: 10, unit: 'boxes' }],
      deliveryTime: { type: 'am' },
      assignedDriver: '1',
      status: 'assigned',
      notes: 'Leave at side entrance',
      createdAt: new Date(),
    },
  ]);

  const addDriver = (driver: Driver) => {
    setDrivers([...drivers, driver]);
  };

  const updateDriver = (id: string, updates: Partial<Driver>) => {
    setDrivers(drivers.map(d => (d.id === id ? { ...d, ...updates } : d)));
  };

  const deleteDriver = (id: string) => {
    setDrivers(drivers.filter(d => d.id !== id));
  };

  const addDelivery = (delivery: Delivery) => {
    setDeliveries([...deliveries, delivery]);
  };

  const updateDelivery = (id: string, updates: Partial<Delivery>) => {
    setDeliveries(deliveries.map(d => (d.id === id ? { ...d, ...updates } : d)));
  };

  const deleteDelivery = (id: string) => {
    setDeliveries(deliveries.filter(d => d.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        drivers,
        deliveries,
        addDriver,
        updateDriver,
        deleteDriver,
        addDelivery,
        updateDelivery,
        deleteDelivery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};