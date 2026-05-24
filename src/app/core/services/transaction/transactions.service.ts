import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map, Observable } from 'rxjs';

import { CreateTransactionRequest } from '@core/requests';
import { TransactionMapperService } from '@core/mappers';
import { TransactionModel } from '@core/models';
import { ApiResponse } from '@core/interfaces';
import { TransactionDTO } from '@core/dtos';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  private http = inject(HttpClient);
  private mapper = inject(TransactionMapperService);
  private endpoint = 'transactions';

  public create(body: CreateTransactionRequest): Observable<TransactionModel> {
    return this.http
      .post<
        ApiResponse<TransactionDTO>
      >(`${environment.merakiUrl}/${this.endpoint}/create`, body)
      .pipe(
        map((response: ApiResponse<TransactionDTO>) =>
          this.mapper.toModel(response.data),
        ),
      );
  }

  public findAll(
    limit: number = 10,
    page: number = 1,
  ): Observable<TransactionModel[]> {
    const params = new HttpParams().set('limit', limit).set('page', page);
    return this.http
      .get<
        ApiResponse<TransactionDTO[]>
      >(`${environment.merakiUrl}/${this.endpoint}/find-all`, { params })
      .pipe(
        map((response: ApiResponse<TransactionDTO[]>) =>
          response.data.map((transaction) => this.mapper.toModel(transaction)),
        ),
      );
  }

  public findOne(id: string): Observable<TransactionModel> {
    return this.http
      .get<
        ApiResponse<TransactionDTO>
      >(`${environment.merakiUrl}/${this.endpoint}/find-one/${id}`)
      .pipe(
        map((response: ApiResponse<TransactionDTO>) =>
          this.mapper.toModel(response.data),
        ),
      );
  }

  public delete(id: string): Observable<ApiResponse<{ message: string }>> {
    return this.http.delete<ApiResponse<{ message: string }>>(
      `${environment.merakiUrl}/${this.endpoint}/delete/${id}`,
    );
  }
}
