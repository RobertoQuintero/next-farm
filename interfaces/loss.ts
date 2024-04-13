
export interface ILoss {
  id_loss:        number;
  id_loss_reason: number;
  id_pig:         number | null;
  id_growing_lot: null | number;
  id_lot_piglets: null | number;
  id_pig_type:    number;
  status:         boolean;
  created_at:     string | Date;
  comment:        string;
  pig_type:    string;
  loss_reason:    string;
  quantity:number;
}

export interface ILossGet{
  id_pig:         number | null;
  id_growing_lot: null | number;
  id_lot_piglets: null | number;
}