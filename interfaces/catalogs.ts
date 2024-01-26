
export interface IUbication {
  id_ubication: number;
  id_pig_type:  number;
  description:  string;
  status:       boolean;
  id_farm:      number;
}

export interface IPigType {
  id_pig_type: number;
  description: string;
  status:      boolean;
  id_user:     number;
}

export interface IRace {
  id_race:     number;
  description: string;
  status:      boolean;
}

export interface IStage {
  id_stage:    number;
  id_pig_type: number;
  description: string;
  order:       number;
  status:      boolean;
}

export interface IUbication {
  id_ubication: number;
  id_pig_type:  number;
  description:  string;
  status:       boolean;
  id_farm:      number;
}

export interface ITask {
  id_task:      number;
  id_task_type: number;
  id_stage:     number;
  description:  string;
  status:       boolean;
  created_at:   string | Date;
  updated_at:   string | Date;
  days:         number;
  id_pig_type:  number;
}
