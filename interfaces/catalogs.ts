
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
  id_farm:number;
  created_at:   string | Date;
  updated_at:   string | Date;
}

export interface IStage {
  id_stage:    number;
  id_stage_type:    number;
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
  id_task:     number;
  id_pig:      number;
  id_pig_task: number;
  id_user:     number;
  start_date:  string | Date;
  end_date:    string | Date;
  created_at:  string | Date;
  done:        boolean;
  comment:     string;
  status:      boolean;
  description?:string;
  name?:string;
  id_lot_piglets:number;
  end_stage:boolean;
  change_to_stage: null | number | string;
  is_movement_task:boolean;
  pig_ubication?:string;
  piglets_ubication?:string;
  id_birth?: number;
}

export interface ITaskType {
  id_task_type: number;
  description:  string;
  status:       boolean;
  id_farm:      number;
}

export interface ILossReason {
  id_loss_reason: number;
  description:    string;
  status:         boolean;
  created_at:     string | Date;
  updated_at:     string | Date;
  id_farm:        number;
}

export interface IfertilizationType {
  id_fertilization_type: number;
  description:           string;
  status:                boolean;
}



export interface IPigStage {
  id_pig_stage: number;
  id_pig_type:  number;
  description:  string;
  status:       boolean;
}

// Generated by https://quicktype.io

export interface IPigTask {
  id_pig_task:        number;
  id_pig_stage:       number;
  description:        string;
  status:             boolean;
  created_at:         string | Date;
  id_farm:            number;
  days:               number;
  while_days:         number;
  id_stage_task_type: number;
  end_stage:boolean;
  change_to_stage: null | number | string;
  is_movement_task:boolean;
  id_pig_type:number | null;
  days_diff?:number;
  id_user?:number;
}


export interface IStageTaskType {
  id_stage_task_type: number;
  description:        string;
  status:             boolean;
}

export interface IBirthType {
  id_birth_type: number;
  description:    string;
  status:        boolean;
}
