
export interface ICompany {
  id_company: number;
  name:       string;
  address:    string;
  created_at:  string | Date;
  updated_at: string | Date;
  id_state:   number;
  zip:        string;
  phone:      string;
  status:     boolean;
  email:      string;
  password:   string;
  is_active:  boolean;
  id_role:    number;
  type?:number
}


export interface IState {
  id_state:    number;
  description: string;
}
