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
