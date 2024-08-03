import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function rangeValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value !== null && (isNaN(value) || value < min || value > max)) {
      return { range: { min, max } };
    }
    return null;
  };
}
