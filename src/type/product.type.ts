export type Products = {
  id: string;
  name: string;
  category: string;
  image: string;
  description?: string;
  stock: [
    {
      qty: number;
      size: string;
    }
  ];
  price: string;
  updated_at: Date;
  created_at: Date;
};
