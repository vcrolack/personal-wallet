import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class DateValidator {
  public static minDate(
    minDateOrFn: Date | string | null | undefined | (() => Date | string | null | undefined)
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const minDate = typeof minDateOrFn === 'function' ? minDateOrFn() : minDateOrFn;
      if (!minDate) return null;

      const inputDate = new Date(value);
      const min = new Date(minDate);

      if (isNaN(inputDate.getTime()) || isNaN(min.getTime())) {
        return { invalidDate: true };
      }

      const normalizedInput = new Date(
        inputDate.getFullYear(),
        inputDate.getMonth(),
        inputDate.getDate(),
      );
      const normalizedMin = new Date(
        min.getFullYear(),
        min.getMonth(),
        min.getDate(),
      );

      return normalizedInput < normalizedMin
        ? { minDate: { required: normalizedMin, actual: normalizedInput } }
        : null;
    };
  }

  public static maxDate(
    maxDateOrFn: Date | string | null | undefined | (() => Date | string | null | undefined)
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const maxDate = typeof maxDateOrFn === 'function' ? maxDateOrFn() : maxDateOrFn;
      if (!maxDate) return null;

      const inputDate = new Date(value);
      const max = new Date(maxDate);

      if (isNaN(inputDate.getTime()) || isNaN(max.getTime())) {
        return { invalidDate: true };
      }

      const normalizedInput = new Date(
        inputDate.getFullYear(),
        inputDate.getMonth(),
        inputDate.getDate(),
      );
      const normalizedMax = new Date(
        max.getFullYear(),
        max.getMonth(),
        max.getDate(),
      );

      return normalizedInput > normalizedMax
        ? { maxDate: { required: normalizedMax, actual: normalizedInput } }
        : null;
    };
  }
}
