export interface BaseResponse<T = any> {
  status: boolean;     
  code: string;
  message: string;     
  data?: T | null;
}