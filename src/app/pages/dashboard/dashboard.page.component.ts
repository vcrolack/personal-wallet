import { Component } from '@angular/core';
import { MoneyPipe } from '../../common/pipes/money.pipe';

@Component({
  selector: 'app-dashboard.page',
  imports: [MoneyPipe],
  templateUrl: './dashboard.page.component.html',
  styleUrl: './dashboard.page.component.css',
})
export class DashboardPageComponent {}
