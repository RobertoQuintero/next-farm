
export interface IUser {
  id_user:         number;
  id_company:      number;
  name:            string;
  email:           string;
  phone:           string;
  img_url:         string;
  password:        string;
  id_role:         number;
  id_job_position: number;
  created_at:      string | Date;
  updated_at:      string | Date;
  status:          boolean;
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
