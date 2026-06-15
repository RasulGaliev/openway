export type OrderStatus = 'pending' | 'ready' | 'received';

export interface Order {
  id: string;
  userId: string;
  productId: string;
  quantity: number;
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
}
