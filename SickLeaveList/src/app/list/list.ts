export class List {
  dateFrom: Date;
  dateTo: Date;
  type: string;
  constructor(dateFrom: Date, dateTo: Date, type:string) {
    this.dateFrom = dateFrom;
    this.dateTo = dateTo;
    this.type = type;
  }
}
