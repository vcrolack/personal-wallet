import {
  Component,
  ElementRef,
  input,
  output,
  signal,
  viewChild,
  afterNextRender,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editable-field',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editable-field.component.html',
  styleUrl: './editable-field.component.css',
})
export class EditableFieldComponent<T extends number | string> {
  public value = input.required<T>();
  public label = input<string>('');
  public saved = output<T>();
  public type = input<'number' | 'text'>('text');
  public size = input<'title' | 'subtitle' | 'body' | 'small'>('title');

  public sizeClasses = computed(() => {
    switch (this.size()) {
      case 'title':
        return 'text-3xl font-bold';
      case 'subtitle':
        return 'text-xl font-semibold';
      case 'small':
        return 'text-sm font-medium';
      case 'body':
      default:
        return 'text-base font-normal';
    }
  });

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

    setTimeout(() => {
      this.inputElement()?.nativeElement.focus();
      this.inputElement()?.nativeElement.select();
    }, 0);
  }

  public save() {
    if (!this.isEditing()) return;

    let finalValue: T = this.editValue;

    if (this.type() === 'number' && typeof this.editValue === 'string') {
      finalValue = Number(this.editValue) as T;
    }

    if (finalValue !== this.value()) {
      this.saved.emit(finalValue);
    }
    this.isEditing.set(false);
  }

  public cancel() {
    this.isEditing.set(false);
  }
}
