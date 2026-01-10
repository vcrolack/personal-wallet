import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TransactionMapperService } from '../mappers/transaction-mapper.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { TransactionModel } from '../models/transaction/transaction.model';
import { ApiResponse } from '../interfaces/api-response.interface';
import { TransactionDTO } from '../dtos/transaction/transaction.dto';
import { environment } from '../../../environments/environment';
import { CreateTransactionRequest } from '../requests/transaction/create-transaction.request';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private http = inject(HttpClient);
  private mapper = inject(TransactionMapperService);
  private endpoint = 'transactions';

  public create(body: CreateTransactionRequest): Observable<TransactionModel> {
    return this.http
      .post<ApiResponse<TransactionDTO>>(
        `${environment.merakiUrl}/${this.endpoint}/create`,
        body
      )
      .pipe(
        map((response: ApiResponse<TransactionDTO>) =>
          this.mapper.toModel(response.data)
        ),
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(() => new Error(error.error.message));
        })
      );
  }

  public findAll(
    limit: number = 10,
    offset: number = 0
  ): Observable<TransactionModel[]> {
    const params = new HttpParams().set('limit', limit).set('offset', offset);
    return this.http
      .get<ApiResponse<TransactionDTO[]>>(
        `${environment.merakiUrl}/${this.endpoint}/find-all`,
        { params }
      )
      .pipe(
        map((response: ApiResponse<TransactionDTO[]>) =>
          response.data.map((transaction) => this.mapper.toModel(transaction))
        ),
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(() => new Error(error.error.message));
        })
      );
  }

  public findOne(id: string): Observable<TransactionModel> {
    return this.http
      .get<ApiResponse<TransactionDTO>>(
        `${environment.merakiUrl}/${this.endpoint}/find-one/${id}`
      )
      .pipe(
        map((response: ApiResponse<TransactionDTO>) =>
          this.mapper.toModel(response.data)
        ),
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(() => new Error(error.error.message));
        })
      );
  }

  public delete(id: string): Observable<ApiResponse<{ message: string }>> {
    return this.http
      .delete<ApiResponse<{ message: string }>>(
        `${environment.merakiUrl}/${this.endpoint}/delete/${id}`
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(() => new Error(error.error.message));
        })
      );
  }
}
