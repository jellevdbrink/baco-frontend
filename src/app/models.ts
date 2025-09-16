export type Team = {
  id: number;
  name: string;
  start_date: Date;
};

export type TeamMember = {
  id: number;
  name: string;
  team: Team;
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
