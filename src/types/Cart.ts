export type CartEntry = {
  id: number;
  name: string;
  quantity: number;
  price: string;
  image_url: string;
};

export type Cart = {
  id: number;
  cart_items: CartEntry[];
  subtotal: string;
  total: string;
};
