import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BankModel } from '../models/banks/bank.model';
import { ApiResponse } from '../interfaces/api-response.interface';
import { BankDTO } from '../dtos/banks/bank.dto';
import { BankMapperService } from '../mappers/bank-mapper.service';
import { environment } from '../../../environments/environment';
import { CreateBankRequest } from '../requests/banks/create-bank.request';
import { UpdateBankRequest } from '../requests/banks/update-bank.request';

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
