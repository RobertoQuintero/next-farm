export interface IGrowingPigs {
  id_growing_lot: number;
  id_pig_stage:   number;
  id_ubication:   number;
  quantity:       number;
  created_at:     string | Date;
  start_date:     string | Date;
  exit_date:      string | Date;
  id_user:        number;
  closed:         boolean;
  status:         boolean;
  average_weight: number;
  id_farm:        number;
  pig_stage?:      string;
  ubication?:      string;
  month_name?: string;
}
