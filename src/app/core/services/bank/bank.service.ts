import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import { BankDTO } from '@core/dtos';
import { ApiResponse } from '@core/interfaces';
import { BankModel } from '@core/models';
import { BankMapperService } from '@core/mappers';
import { CreateBankRequest, UpdateBankRequest } from '@core/requests';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  private http = inject(HttpClient);
  private mapper = inject(BankMapperService);
  private endpoint = 'banks';

  public create(body: CreateBankRequest): Observable<BankModel> {
    return this.http
      .post<
        ApiResponse<BankDTO>
      >(`${environment.merakiUrl}/${this.endpoint}/create`, body)
      .pipe(
        map((response: ApiResponse<BankDTO>) =>
          this.mapper.toModel(response.data),
        ),
      );
  }

  public findAll(
    limit: number = 10,
    page: number = 1,
  ): Observable<BankModel[]> {
    const params = new HttpParams().set('limit', limit).set('page', page);

    return this.http
      .get<
        ApiResponse<BankDTO[]>
      >(`${environment.merakiUrl}/${this.endpoint}/find-all`, { params })
      .pipe(
        map((response: ApiResponse<BankDTO[]>) =>
          response.data.map((bank) => this.mapper.toModel(bank)),
        ),
      );
  }

  public update(id: number, body: UpdateBankRequest): Observable<BankModel> {
    if (!body.name || body.name.trim().length === 0)
      throw new Error('Nombre no puede estar vacío');

    return this.http
      .put<
        ApiResponse<BankDTO>
      >(`${environment.merakiUrl}/${this.endpoint}/update/${id}`, body)
      .pipe(
        map((response: ApiResponse<BankDTO>) =>
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
