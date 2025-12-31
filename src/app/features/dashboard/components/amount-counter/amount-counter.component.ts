import { Component, input } from '@angular/core';
import { MoneyPipe } from '../../../../common/pipes/money.pipe';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-amount-counter',
  imports: [MoneyPipe, NgClass],
  templateUrl: './amount-counter.component.html',
  styleUrl: './amount-counter.component.css',
})
export class AmountCounterComponent {
  public label = input.required<string>();
  public amount = input.required<number>();
  public color = input<string>('');
}
