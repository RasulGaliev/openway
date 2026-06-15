export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: 'earn' | 'spend';
  description: string;
  createdAt: Date;
}
