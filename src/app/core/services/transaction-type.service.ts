import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TransactionTypeMapperService } from '../mappers/transaction-type-mapper.service';
import { map, Observable } from 'rxjs';
import { TransactionTypeDTO } from '../dtos/transaction/transaction-type/transaction-type.dto';
import { ApiResponse } from '../interfaces/api-response.interface';
import { TransactionTypeModel } from '../models/transaction/transaction-type/transaction-type.model';
import { environment } from '../../../environments/environment';
import { CreateTransactionTypeRequest } from '../requests/transaction/transaction-type/create-transaction-type.request';
import { UpdateTransactionTypeRequest } from '../requests/transaction/transaction-type/update-transaction-type.request';

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
