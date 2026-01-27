import { Component, forwardRef, input, signal } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-date-selector',
  imports: [ReactiveFormsModule],
  templateUrl: './date-selector.component.html',
  styleUrl: './date-selector.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateSelectorComponent),
      multi: true,
    },
  ],
})
export class DateSelectorComponent implements ControlValueAccessor {
  public label = input<string>('');
  public placeholder = input<string>('');
  public id = input<string>(`date-${Math.random().toString(36).substr(2, 9)}`);
  public min = input<string>('');
  public max = input<string>('');

  public value = signal<string>('');
  public disabled = signal<boolean>(false);

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  public handleInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value; // YYYY-MM-DD
    this.value.set(value);
    this.onChange(value.replace(/-/g, '/')); // Send YYYY/MM/DD
  }

  public handleBlur() {
    this.onTouched();
  }

  writeValue(value: any): void {
    if (!value) {
      this.value.set('');
      return;
    }

    let dateStr = '';

    if (value instanceof Date) {
      // Convert Date object to YYYY-MM-DD
      dateStr = value.toISOString().split('T')[0];
    } else if (typeof value === 'string') {
      // Receive YYYY/MM/DD or ISO string, convert to YYYY-MM-DD for native input
      dateStr = value.replace(/\//g, '-').split('T')[0];
    }

    this.value.set(dateStr);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
