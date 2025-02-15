export interface Log {
  id: number;
  log: string;
  datetime: string;
  user: number;
}

export interface CreateLogParams {
  user: number;
  log: string;
}
