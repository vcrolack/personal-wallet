import { Injectable } from '@angular/core';
import { TransactionTypeDTO } from '../dtos/transaction/transaction-type/transaction-type.dto';
import { TransactionTypeModel } from '../models/transaction/transaction-type/transaction-type.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionTypeMapperService {
  public toModel(dto: TransactionTypeDTO): TransactionTypeModel {
    return {
      id: dto.id,
      name: dto.name,
    };
  }
}
