import { Component } from '@angular/core';
import { HeaderComponent } from '../../../../common/components/header/header.component';
import { WrapperComponent } from '../../../../common/components/wrapper/wrapper.component';

@Component({
  selector: 'app-budget-detail',
  imports: [WrapperComponent],
  templateUrl: './budget-detail.component.html',
  styleUrl: './budget-detail.component.css',
})
export class BudgetDetailComponent {}
