import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { map, Observable } from 'rxjs';

import {
  CreateBudgetCategoryAssignmentRequest,
  UpdateBudgetCategoryAssignmentRequest,
} from '@core/requests';
import { CategoryAssignmentModel } from '@core/models';
import { BudgetCategoryAssignmentDTO } from '@core/dtos';
import { ApiResponse } from '@core/interfaces';
import { environment } from '@env/environment';
import { CategoryAssignmentMapperService } from '@core/mappers';

@Injectable({
  providedIn: 'root',
})
export class BudgetCategoryAssignmentsService {
  private http = inject(HttpClient);
  private mapper = inject(CategoryAssignmentMapperService);
  private endpoint = 'budget-category-assignments';

  public assignCategory(
    body: CreateBudgetCategoryAssignmentRequest,
  ): Observable<CategoryAssignmentModel> {
    return this.http
      .post<
        ApiResponse<BudgetCategoryAssignmentDTO>
      >(`${environment.merakiUrl}/${this.endpoint}/assign-category`, body)
      .pipe(
        map((response: ApiResponse<BudgetCategoryAssignmentDTO>) =>
          this.mapper.toModel(response.data),
        ),
      );
  }

  public unassignCategory(id: string): Observable<{ message: string }> {
    return this.http
      .delete<
        ApiResponse<{ message: string }>
      >(`${environment.merakiUrl}/${this.endpoint}/unassign-category/${id}`)
      .pipe(map((response: ApiResponse<{ message: string }>) => response.data));
  }

  public updateAssignment(
    id: string,
    body: UpdateBudgetCategoryAssignmentRequest,
  ): Observable<CategoryAssignmentModel> {
    return this.http
      .patch<
        ApiResponse<BudgetCategoryAssignmentDTO>
      >(`${environment.merakiUrl}/${this.endpoint}/update-assignment/${id}`, body)
      .pipe(
        map((response: ApiResponse<BudgetCategoryAssignmentDTO>) =>
          this.mapper.toModel(response.data),
        ),
      );
  }
}
