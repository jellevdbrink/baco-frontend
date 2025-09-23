export type Team = {
  id: number;
  number: number;
  start_date: Date;
};

export type TeamMember = {
  id: number;
  name: string;
  team: Team;
  email: string;
  balance: number;
};

export type Category = {
  id: number;
  name: string;
  icon: string;
};

export type Product = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  category: Category;
};

export type OrderItem = {
  product: Product;
  quantity: number;
};

export type OrderItemDto = Omit<OrderItem, 'product'> & {
  product_id: number;
};

export type Order = {
  datetime: Date;
  by: number;
  items: OrderItem[];
};

export type Payment = {
  id: number;
  description: string;
  by: number;
  proof_picture: string;
  completed: boolean;
  amount: number;
};

export type PaymentDto = Omit<Payment, 'id' | 'proof_picture' | 'completed'> & {
  // proof_picture: File;
};
