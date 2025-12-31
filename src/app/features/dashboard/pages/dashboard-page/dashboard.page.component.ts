import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { AmountCounterComponent } from '../../components/amount-counter/amount-counter.component';

@Component({
  selector: 'app-dashboard.page',
  imports: [AmountCounterComponent, DatePipe],
  templateUrl: './dashboard.page.component.html',
  styleUrl: './dashboard.page.component.css',
})
export class DashboardPageComponent {
  public currentDate: Date = new Date();
}
