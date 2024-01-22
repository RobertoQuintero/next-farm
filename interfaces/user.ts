
export interface IUser {
  id_user:    number;
  name:       string;
  email:      string;
  phone:      string;
  img_url:    string;
  password:   string;
  id_role:    number;
  created_at: string | Date;
  updated_at: string | Date;
  status:     boolean;
  is_active:  boolean;
  is_company: boolean;
  zip:        string;
  address:    string;
  id_state:   number;
  id_farm:   number;
}


export interface IJobPosition {
  id_job_position: number;
  description:     string;
  status:          boolean;
  id_company:      number;
}

export interface IRole {
  id_role:     number;
  description: string;
  status:      boolean;
}

export interface IAccess {
  id_access:   number;
  description: string;
  status:      boolean;
}

export interface IRoleAccess {
  id_role_access: number;
  id_role:        number;
  id_access:      number;
  status:         boolean;
  id_farm:        number;
  name:string;
}
