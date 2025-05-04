
export interface DayData {
  date: Date;
  dayName: string;
  dayMonth: string;
  selected: boolean;
}

export interface WeekData {
  label: string;
  days: DayData[];
  selectAll: boolean;
}
