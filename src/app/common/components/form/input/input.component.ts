import { Component, forwardRef, input, signal } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  public label = input<string>('');
  public type = input<string>('text');
  public placeholder = input<string>('');
  public id = input<string>(`input-${Math.random().toString(36).substr(2, 9)}`);

  public value = signal<any>('');
  public disabled = signal<boolean>(false);

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  public handleInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.value.set(inputElement.value);
    this.onChange(inputElement.value);
  }

  public handleBlur() {
    this.onTouched();
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    this.value.set(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
