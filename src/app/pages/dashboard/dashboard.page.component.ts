import { Component } from '@angular/core';
import { MoneyPipe } from '../../common/pipes/money.pipe';
import { AmountCounterComponent } from './components/amount-counter/amount-counter.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard.page',
  imports: [MoneyPipe, AmountCounterComponent, DatePipe],
  templateUrl: './dashboard.page.component.html',
  styleUrl: './dashboard.page.component.css',
})
export class DashboardPageComponent {
  public currentDate: Date = new Date();
}
