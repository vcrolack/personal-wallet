import { Component } from '@angular/core';
import { InputComponent } from '../../../../../common/components/input/input.component';
import { ButtonComponent } from '../../../../../common/components/button/button.component';

@Component({
  selector: 'app-create-category',
  imports: [InputComponent, ButtonComponent],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.css',
})
export class CreateCategoryComponent {}
