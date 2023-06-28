export interface BaseRequestResult<T> {
  status: string;
  statusCode: number;
  message: string;
  data: T;
}
