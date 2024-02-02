
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
  min_weight:  number;
  max_weight:  number;
  food_amount: number;
  id_farm:     number;
}


export interface IUbication {
  id_ubication: number;
  id_pig_type:  number;
  description:  string;
  status:       boolean;
  id_farm:      number;
  pig_type:string;
  created_at:   string | Date;
  updated_at:   string | Date;
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
  stage:        string;
  pig_type:     string;
  id_farm:      number;
  task_type:string;
}

export interface ITaskType {
  id_task_type: number;
  description:  string;
  status:       boolean;
  id_farm:      number;
}


