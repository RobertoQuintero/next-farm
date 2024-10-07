export interface IReport {
  report:  Report;
  growing: Growing[];
  pigs:    Pig[];
}

export interface Growing {
  month:    string;
  quantity: number;
}

export interface Pig {
  stage:  string;
  months: Growing[];
}

export interface Report {
  piglets:  number;
  box:      number;
  weight_1: number;
  weight_2: number;
  others:   number;
  pigs:     number;
  total:    number;
}


export interface IPigLossType {
  pig_type:     string;
  loss_reasons: LossReason[];
}

export interface LossReason {
  loss_reason: string;
  months:      Month[];
}

export interface Month {
  month:           string;
  losses_quantity: number;
}

