import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateBudgetCategoryAssignmentRequest } from '../requests/budget-category-assignments/create-budget-category-assignment.request';
import { catchError, map, Observable, throwError } from 'rxjs';
import { CategoryAssignmentModel } from '../models/categories/category-assignment.model';
import { BudgetCategoryAssignmentDTO } from '../dtos/categories/budget-category-assignments.dto';
import { ApiResponse } from '../interfaces/api-response.interface';
import { environment } from '../../../environments/environment';
import { CategoryAssignmentMapperService } from '../mappers/category-assignment-mapper.service';
import { UpdateBudgetCategoryAssignmentRequest } from '../requests/budget-category-assignments/update-budget-category-assignment.request';

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
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(() => new Error(error.error.message));
        }),
      );
  }

  public unassingCategory(id: string): Observable<{ message: string }> {
    return this.http
      .delete<
        ApiResponse<{ message: string }>
      >(`${environment.merakiUrl}/${this.endpoint}/unassign-category/${id}`)
      .pipe(
        map((response: ApiResponse<{ message: string }>) => response.data),
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(() => new Error(error.error.message));
        }),
      );
  }

  public updateAssignment(
    id: string,
    body: UpdateBudgetCategoryAssignmentRequest,
  ): Observable<CategoryAssignmentModel> {
    const requestBody = {
      ...body,
      ...(body.allocatedAmount !== undefined && {
        allocatedAmount: +body.allocatedAmount,
      }),
      ...(body.budgetCategoryValueId !== undefined && {
        budgetCategoryValueId: +body.budgetCategoryValueId,
      }),
    };

    return this.http
      .patch<
        ApiResponse<BudgetCategoryAssignmentDTO>
      >(`${environment.merakiUrl}/${this.endpoint}/update-assignment/${id}`, requestBody)
      .pipe(
        map((response: ApiResponse<BudgetCategoryAssignmentDTO>) =>
          this.mapper.toModel(response.data),
        ),
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          return throwError(() => new Error(error.error.message));
        }),
      );
  }
}
