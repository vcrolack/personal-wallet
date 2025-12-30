import { Component, inject, computed } from '@angular/core';
import { WrapperComponent } from '../../../../common/components/wrapper/wrapper.component';
import { BudgetService } from '../../../../core/services/budget.service';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProgressBarComponent } from '../../../../common/components/progress-bar/progress-bar.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-budget-detail',
  imports: [WrapperComponent, ProgressBarComponent, CurrencyPipe],
  templateUrl: './budget-detail.component.html',
  styleUrl: './budget-detail.component.css',
})
export class BudgetDetailComponent {
  private budgetService = inject(BudgetService);
  private route = inject(ActivatedRoute);

  public budget = computed(() => this.budgetResource.value()?.data);
  public isLoading = computed(() => this.budgetResource.isLoading());

  public budgetResource = rxResource({
    request: () => ({ id: this.route.snapshot.paramMap.get('id')! }),
    loader: ({ request }) => {
      return this.budgetService.findOne(request.id);
    },
  });
}
