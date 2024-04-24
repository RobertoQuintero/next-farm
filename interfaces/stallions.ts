export interface IStallionMonths{
  report_crossing:IStallionReport[];
  report_births:IStallionReport[];
}

export interface IStallionReport {
  stallion: string;
  months:   Month[];
}

export interface Month {
  month:    string;
  quantity: number;
}
