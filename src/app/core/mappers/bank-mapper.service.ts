import { Injectable } from '@angular/core';
import { BankDTO } from '../dtos/banks/bank.dto';
import { BankModel } from '../models/banks/bank.model';

@Injectable({
  providedIn: 'root',
})
export class BankMapperService {
  public toModel(dto: BankDTO): BankModel {
    return {
      id: dto.id,
      name: dto.name,
    };
  }
}
