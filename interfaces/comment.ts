
export interface IComment {
  id_comment:  number;
  id_pig:      number;
  description: string;
  created_at:  string;
  updated_at:  string;
  status:      boolean;
  id_user:     number;
  name:        string;
  id_lot_piglets: number | null;
}
