import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BudgetCategoryValuesService } from '../../../../../../../core/services/budget-category-values.service';
import {
  AutocompleteComponent,
  AutocompleteOption,
} from '../../../../../../../common/components/form/autocomplete/autocomplete.component';
import { finalize, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-category-value-selector',
  imports: [ReactiveFormsModule, AutocompleteComponent],
  templateUrl: './category-value-selector.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryValueSelector {
  private categoryValueService = inject(BudgetCategoryValuesService);

  public form = input.required<FormGroup>();
  public isLoading = signal<boolean>(false);

  public categoryId = toSignal(
    toObservable(this.form).pipe(
      switchMap((form) =>
        form
          .get('category')!
          .valueChanges.pipe(startWith(form.get('category')!.value)),
      ),
    ),
  );

  public categoryValuesResource =
    this.categoryValueService.categoryValuesResource;

  constructor() {
    effect(() => {
      const categoryId = this.categoryId();
      this.categoryValueService.selectCategory(categoryId as number);
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.categoryValueService.selectCategory(undefined as any);
    this.form().reset();
  }

  public categoryValuesForSelect = computed((): AutocompleteOption[] => {
    return this.categoryValuesData().map((categoryValue) => ({
      label: categoryValue.name,
      value: categoryValue.id,
    }));
  });

  public categoryValuesData = computed(() => {
    const response = this.categoryValuesResource.value();
    if (!response || Array.isArray(response)) return [];
    return response.data;
  });

  public createCategoryValue(name: string) {
    this.categoryValueService
      .create({
        name,
        budgetCategoryId: this.form().value.category,
      })
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (categoryValue) => {
          this.categoryValueService.reloadList();
          this.form().patchValue({ categoryValue: categoryValue.id });
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  public searchCategoryValue(term: string) {
    this.categoryValueService.search(term);
  }
}
