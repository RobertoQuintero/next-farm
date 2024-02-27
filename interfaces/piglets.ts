
export interface IPiglets {
  id_lot_piglets: number;
  id_birth:       number;
  quantity:       number;
  created_at:     string;
  id_user:        number;
  id_ubication:   number;
  id_pig_stage:   number;
  code:           string;
  status:         boolean;
  closed:         boolean;
  id_farm:        number;
  user?:           string;
  ubication?:      string;
  stage?:          string;
}
