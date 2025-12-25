export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export interface ErrorResponse {
  statusCode: number;
  message: string;
  error: object;
}
