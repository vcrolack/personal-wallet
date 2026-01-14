import { Component } from '@angular/core';

import { SkeletonComponent } from '../../../../../../common/components/ui/skeleton/skeleton.component';
import { WrapperComponent } from '../../../../../../common/components/ui/wrapper/wrapper.component';

@Component({
  selector: 'app-budget-detail-skeleton',
  standalone: true,
  imports: [SkeletonComponent, WrapperComponent],
  template: `
    <div class="flex flex-col gap-10">
      <!-- Hero Skeleton -->
      <app-wrapper>
        <div
          class="p-8 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 items-center"
        >
          <!-- Circle skeleton -->
          <div class="flex justify-center">
            <app-skeleton
              width="160px"
              height="160px"
              borderRadius="100%"
            ></app-skeleton>
          </div>

          <!-- Details skeleton -->
          <div class="grid grid-cols-2 gap-4">
            <div class="col-span-2 flex flex-col items-center gap-2">
              <app-skeleton width="120px" height="16px"></app-skeleton>
              <app-skeleton width="200px" height="40px"></app-skeleton>
            </div>
            <div class="flex flex-col items-center gap-2">
              <app-skeleton width="100px" height="14px"></app-skeleton>
              <app-skeleton width="140px" height="32px"></app-skeleton>
            </div>
            <div class="flex flex-col items-center gap-2">
              <app-skeleton width="100px" height="14px"></app-skeleton>
              <app-skeleton width="140px" height="32px"></app-skeleton>
            </div>
          </div>
        </div>
      </app-wrapper>

      <!-- Button Skeleton -->
      <div class="w-48">
        <app-skeleton height="44px" borderRadius="0.5rem"></app-skeleton>
      </div>

      <!-- Categories List Skeleton -->
      <div class="flex flex-col gap-4">
        @for (i of [1,2,3]; track i) {
        <app-wrapper>
          <div class="p-4 flex justify-between items-center">
            <div class="flex gap-4 items-center">
              <app-skeleton
                width="48px"
                height="48px"
                borderRadius="100%"
              ></app-skeleton>
              <div class="flex flex-col gap-2">
                <app-skeleton width="150px" height="20px"></app-skeleton>
                <app-skeleton width="100px" height="14px"></app-skeleton>
              </div>
            </div>
            <app-skeleton width="80px" height="24px"></app-skeleton>
          </div>
        </app-wrapper>
        }
      </div>
    </div>
  `,
})
export class BudgetDetailSkeletonComponent {}
