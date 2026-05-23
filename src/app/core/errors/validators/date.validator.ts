import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class DateValidator {
  public static minDate(minDate: Date): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const inputDate = new Date(value);

      const normalizedInput = new Date(
        inputDate.getFullYear(),
        inputDate.getMonth(),
        inputDate.getDate(),
      );
      const normalizedMin = new Date(
        minDate.getFullYear(),
        minDate.getMonth(),
        minDate.getDate(),
      );

      if (isNaN(normalizedInput.getTime())) {
        return { invalidDate: true };
      }

      return normalizedInput < normalizedMin
        ? { minDate: { required: normalizedMin, actual: normalizedInput } }
        : null;
    };
  }

  public static maxDate(maxDate: Date): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const inputDate = new Date(value);
      const normalizedInput = new Date(
        inputDate.getFullYear(),
        inputDate.getMonth(),
        inputDate.getDate(),
      );
      const normalizedMax = new Date(
        maxDate.getFullYear(),
        maxDate.getMonth(),
        maxDate.getDate(),
      );

      if (isNaN(normalizedInput.getTime())) {
        return { invalidDate: true };
      }

      return normalizedInput > normalizedMax
        ? { maxDate: { required: maxDate, actual: normalizedInput } }
        : null;
    };
  }
}
