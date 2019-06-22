export interface Job {
  _id: string;
  apartment: string;
  building: string;
  name: string;
  subcat: string;
  room: string;
  price: number;
  status: string;
  quantity: number;
  workerComment: string;
  adminComment: string;
  sentDate: Date;
  endDate: Date;
  vendor: object;
}
