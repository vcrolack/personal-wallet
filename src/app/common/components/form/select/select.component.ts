import { Component, forwardRef, input, signal } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

export interface SelectOption {
  label: string;
  value: any;
}

@Component({
  selector: 'app-select',
  imports: [ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  public label = input<string>('');
  public options = input<SelectOption[]>([]);
  public placeholder = input<string>('Seleccione una opción');
  public id = input<string>(
    `select-${Math.random().toString(36).substr(2, 9)}`
  );

  public value = signal<any>('');
  public disabled = signal<boolean>(false);

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  public handleChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const selectedValue = selectElement.value;

    // Find the original option to preserve its type (e.g., number)
    const option = this.options().find(
      (opt) => String(opt.value) === selectedValue
    );

    const finalValue = option ? option.value : selectedValue;

    this.value.set(finalValue);
    this.onChange(finalValue);
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
