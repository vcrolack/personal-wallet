import { CreateCategoryRequest } from './create-category.request';

export interface UpdateCategoryRequest extends Partial<CreateCategoryRequest> {}
