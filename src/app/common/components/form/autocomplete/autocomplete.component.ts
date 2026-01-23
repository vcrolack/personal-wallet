import {
  Component,
  computed,
  forwardRef,
  input,
  output,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';

export interface AutocompleteOption {
  label: string;
  value: any;
}

@Component({
  selector: 'app-autocomplete',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './autocomplete.component.html',
  styleUrl: './autocomplete.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true,
    },
  ],
})
export class AutocompleteComponent implements ControlValueAccessor {
  public label = input<string>('');
  public options = input<AutocompleteOption[]>([]);
  public placeholder = input<string>('Escribe para buscar...');
  public noResultsActionLabel = input<string>('Agregar nuevo');
  public id = input<string>(
    `autocomplete-${Math.random().toString(36).substring(2, 9)}`
  );

  public noResultsClick = output<string>();

  public query = signal<string>('');
  public isOpen = signal<boolean>(false);
  public value = signal<any>(null);
  public disabled = signal<boolean>(false);

  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  public filteredOptions = computed(() => {
    const q = this.query().toLowerCase();
    if (!q) return this.options();
    return this.options().filter((opt) => opt.label.toLowerCase().includes(q));
  });

  public handleInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.query.set(inputElement.value);
    this.isOpen.set(true);

    // Reset value if user is typing and it doesn't match a selection anymore
    // This is optional depending on requirements, but often desired
    if (this.value()) {
      this.value.set(null);
      this.onChange(null);
    }
  }

  public selectOption(option: AutocompleteOption) {
    this.value.set(option.value);
    this.query.set(option.label);
    this.isOpen.set(false);
    this.onChange(option.value);
  }

  public handleNoResultsClick() {
    this.noResultsClick.emit(this.query());
    this.isOpen.set(false);
  }

  public handleBlur() {
    // Timeout to allow click on option before closing
    setTimeout(() => {
      this.isOpen.set(false);
      this.onTouched();
    }, 200);
  }

  public handleFocus() {
    if (!this.disabled()) {
      this.isOpen.set(true);
    }
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    this.value.set(value);
    if (value === null || value === undefined) {
      this.query.set('');
    } else {
      const selected = this.options().find((opt) => opt.value === value);
      if (selected) {
        this.query.set(selected.label);
      }
    }
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
