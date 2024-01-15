
export interface IFarm {
  id_farm:    number;
  name:       string;
  address:    string;
  id_company: number;
  zip:        string;
  phone:      string;
  status:     boolean;
  created_at: string | Date;
}
