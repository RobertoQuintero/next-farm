
export interface IFarm {
  id_farm:    number;
  name:       string;
  address:    string;
  id_user: number;
  zip:        string;
  phone:      string;
  status:     boolean;
  created_at: string | Date;
}

export interface IMonthBirth{
  month:string;
  quantity:number;
}