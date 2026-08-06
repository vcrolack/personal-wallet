import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'money', standalone: true })
export class MoneyPipe implements PipeTransform {
  transform(amount?: number, currency: string = 'CLP'): string {
    const value = amount ?? 0;
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(value);
  }
}
