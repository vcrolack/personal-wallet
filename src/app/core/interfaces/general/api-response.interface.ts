import { Metadata } from '@core/dtos/metadata.dto';

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
  meta?: Metadata;
}

export interface ErrorResponse {
  statusCode: number;
  message: string;
  error: object;
}
