import {
  Component,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
  afterNextRender,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editable-amount',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editable-amount.component.html',
  styleUrl: './editable-amount.component.css',
})
export class EditableAmountComponent<T extends number | string> {
  public value = input.required<T>();
  public label = input<string>('');
  public saved = output<T>();
  public type = input<'number' | 'text'>('text');

  public isEditing = signal(false);
  public editValue!: T;

  private inputElement = viewChild<ElementRef<HTMLInputElement>>('amountInput');

  constructor() {
    afterNextRender(() => {
      if (this.isEditing() && this.inputElement()) {
        this.inputElement()?.nativeElement.focus();
        this.inputElement()?.nativeElement.select();
      }
    });
  }

  public startEditing() {
    this.editValue = this.value();
    this.isEditing.set(true);

    // We need to wait for the next render to focus,
    // but afterNextRender in constructor handles it if it's already editing.
    // For manual toggle, we use a simple setTimeout or effect if needed,
    // but a simpler way is to just use a template variable and focus it.
    setTimeout(() => {
      this.inputElement()?.nativeElement.focus();
      this.inputElement()?.nativeElement.select();
    }, 0);
  }

  public save() {
    if (this.editValue !== this.value()) {
      this.saved.emit(this.editValue);
    }
    this.isEditing.set(false);
  }

  public cancel() {
    this.isEditing.set(false);
  }
}
