import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map, Observable } from 'rxjs';

import { TransactionTypeMapperService } from '@core/mappers';
import { TransactionTypeDTO } from '@core/dtos';
import { ApiResponse } from '@core/interfaces';
import { TransactionTypeModel } from '@core/models';
import {
  CreateTransactionTypeRequest,
  UpdateTransactionTypeRequest,
} from '@core/requests';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class TransactionTypeService {
  private http = inject(HttpClient);
  private mapper = inject(TransactionTypeMapperService);
  private endpoint = 'transaction-types';

  public create(
    body: CreateTransactionTypeRequest,
  ): Observable<TransactionTypeModel> {
    return this.http
      .post<
        ApiResponse<TransactionTypeDTO>
      >(`${environment.merakiUrl}/${this.endpoint}/create`, body)
      .pipe(
        map((response: ApiResponse<TransactionTypeDTO>) =>
          this.mapper.toModel(response.data),
        ),
      );
  }

  public findAll(
    limit: number = 10,
    page: number = 1,
  ): Observable<TransactionTypeModel[]> {
    const params = new HttpParams().set('limit', limit).set('page', page);

    return this.http
      .get<
        ApiResponse<TransactionTypeDTO[]>
      >(`${environment.merakiUrl}/${this.endpoint}/find-all`, { params })
      .pipe(
        map((response: ApiResponse<TransactionTypeDTO[]>) =>
          response.data.map((transactionType) =>
            this.mapper.toModel(transactionType),
          ),
        ),
      );
  }

  public update(
    id: number,
    body: UpdateTransactionTypeRequest,
  ): Observable<TransactionTypeModel> {
    if (!body.name || body.name.trim().length === 0)
      throw new Error('El nombre no puede estar vacío');

    return this.http
      .put<
        ApiResponse<TransactionTypeDTO>
      >(`${environment.merakiUrl}/${this.endpoint}/update/${id}`, body)
      .pipe(
        map((response: ApiResponse<TransactionTypeDTO>) =>
          this.mapper.toModel(response.data),
        ),
      );
  }

  public delete(id: number): Observable<ApiResponse<{ message: string }>> {
    return this.http.delete<ApiResponse<{ message: string }>>(
      `${environment.merakiUrl}/${this.endpoint}/delete/${id}`,
    );
  }
}
