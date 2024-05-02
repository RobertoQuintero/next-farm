export interface IQuestion {
  id_question: number;
  description: string;
  status:      boolean;
  id_farm:     number;
  id_user:     number;
  created_at:  Date | string;
  updated_at:  Date | string;
  user_name:   string;
}

export interface IAnswer {
  id_answer:   number;
  id_question: number;
  description: string;
  status:      boolean;
  created_at:  Date | string;
  updated_at:  Date | string;
  id_user:     number;
  user_name:   string;
  id_farm:     number;
}
