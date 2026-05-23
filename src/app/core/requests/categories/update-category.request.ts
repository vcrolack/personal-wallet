import { CreateCategoryRequest } from '@core/requests/categories/create-category.request';

export interface UpdateCategoryRequest extends Partial<CreateCategoryRequest> {}
