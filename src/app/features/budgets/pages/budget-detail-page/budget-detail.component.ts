import { Component, inject, computed, input, effect } from '@angular/core';
import { BudgetService } from '../../../../core/services/budget.service';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { HeroComponent } from './components/hero/hero.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { IconButtonComponent } from '../../../../common/components/form/icon-button/icon-button.component';

@Component({
  selector: 'app-budget-detail',
  imports: [HeroComponent, CategoriesListComponent, IconButtonComponent],
  templateUrl: './budget-detail.component.html',
  styleUrl: './budget-detail.component.css',
})
export class BudgetDetailComponent {
  private budgetService = inject(BudgetService);

  public id = input.required<string>();

  public budget = this.budgetService.budgetResourceDetail;
  public isLoading = this.budgetService.budgetResourceDetail.isLoading;

  constructor() {
    effect(() => this.budgetService.selectBudget(this.id()));
  }
}
