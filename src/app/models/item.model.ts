export interface Item {
  _id: string;
  name: string;
  subcat: string;
  room: object;
  price: number;
  status: string;
  quantity?: number;
  comment?: string;
}
