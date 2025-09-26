import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'money', standalone: true })
export class MoneyPipe implements PipeTransform {
  transform(cents?: number, currency: string = 'ARS'): string {
    const value = (cents ?? 0) / 100;
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency,
    }).format(value);
  }
}
