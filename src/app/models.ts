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
  visible: boolean;
};

export type OrderItem = {
  product: Product;
  quantity: number;
  // unit_price: number; // It does receive this from the api, but has no use here
};

export type OrderItemDto = Omit<OrderItem, 'product' | 'unit_price'> & {
  product_id: number;
};

export type Order = {
  datetime: Date;
  by: number;
  items: OrderItem[];
  total_amount: string; // Should be a number
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
