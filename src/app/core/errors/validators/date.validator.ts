import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class DateValidator {
  public static minDate(
    minDateOrFn:
      | Date
      | string
      | null
      | undefined
      | (() => Date | string | null | undefined),
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const minDate =
        typeof minDateOrFn === 'function' ? minDateOrFn() : minDateOrFn;
      if (!minDate) return null;

      const inputDate = DateValidator.toLocalDate(value);
      const min = DateValidator.toLocalDate(minDate);

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
    maxDateOrFn:
      | Date
      | string
      | null
      | undefined
      | (() => Date | string | null | undefined),
  ): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const maxDate =
        typeof maxDateOrFn === 'function' ? maxDateOrFn() : maxDateOrFn;
      if (!maxDate) return null;

      const inputDate = DateValidator.toLocalDate(value);
      const max = DateValidator.toLocalDate(maxDate);

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

  private static toLocalDate(value: any): Date {
    if (value instanceof Date) {
      return new Date(
        value.getFullYear(),
        value.getMonth(),
        value.getDate(),
        12,
        0,
        0,
      );
    }
    if (typeof value === 'string') {
      const isoDateRegex = /^(\d{4})[-/](\d{1,2})[-/](\d{1,2})$/;
      const match = value.trim().match(isoDateRegex);
      if (match) {
        const year = parseInt(match[1], 10);
        const month = parseInt(match[2], 10) - 1;
        const day = parseInt(match[3], 10);
        return new Date(year, month, day, 12, 0, 0);
      }
      console.warn(
        `[DateParseWarning]: El string "${value}" no cumple con el formato YYYY-MM-DD esperable.`,
      );
    }
    return new Date(value);
  }
}
