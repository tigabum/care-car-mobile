export interface User {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  role: 'customer' | 'washer';
  createdAt: Date;
}

export interface Booking {
  id: string;
  customerId: string;
  washerId: string;
  status: 'pending' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';
  serviceType: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  scheduledFor: Date;
  price: number;
  createdAt: Date;
}
