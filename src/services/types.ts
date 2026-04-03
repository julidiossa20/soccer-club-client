export interface IErrorDetail {
  property: string;
  messages: string[];
}

export interface IBaseResponse {
  success: boolean;
  status: number;
  message: string;
}

export interface ISuccessResponse<T> extends IBaseResponse {
  success: true;
  data: T;
}

export interface IErrorResponse extends IBaseResponse {
  success: false;
  errors: IErrorDetail[];
}

export type ApiResponse<T> = ISuccessResponse<T> | IErrorResponse;
