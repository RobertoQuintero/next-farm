
export interface IProduct {
  id_product:  number;
  description: string;
  code:        string;
  price:       number | string;
  status:      boolean;
  created_at:  string | Date;
  updated_at:  string | Date;
  id_farm:     number;
}
