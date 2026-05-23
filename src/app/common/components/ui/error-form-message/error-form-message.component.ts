import { Component, input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { TextComponent } from '../typography/text/text.component';

@Component({
  selector: 'app-error-form-message',
  imports: [TextComponent],
  templateUrl: './error-form-message.component.html',
})
export class ErrorFormMessage {
  public control = input.required<AbstractControl>();

  public get isValidField(): boolean {
    const ctrl = this.control();
    return ctrl.invalid && ctrl.touched;
  }

  public get errorText(): string | null {
    const ctrl = this.control();
    if (!ctrl.errors) return null;
    return this.getErrorMessage(ctrl.errors);
  }

  private getErrorMessage(errors: ValidationErrors): string | null {
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
        case 'maxlength':
          return `Debe tener como máximo ${errors['maxlength'].requiredLength} caracteres`;
        case 'email':
          return 'Debe ser un correo electrónico válido';
        case 'min':
          return `Debe tener un valor mínimo de ${errors['min'].min}`;
        case 'max':
          return `Debe tener un valor máximo de ${errors['max'].max}`;
        case 'invalidDate':
          return 'La fecha ingresada no es válida';
        case 'minDate': {
          const limitDate = new Date(errors['minDate'].required);
          return `La fecha no puede ser anterior al ${limitDate.toLocaleDateString()}`;
        }
        case 'maxDate': {
          const limitDate = new Date(errors['maxDate'].required);
          return `La fecha no puede ser posterior al ${limitDate.toLocaleDateString()}`;
        }
        default:
          return 'Este campo es inválido';
      }
    }

    return null;
  }
}
