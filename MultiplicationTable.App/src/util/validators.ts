import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function NumbersValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const content: number[] = (control.value!).split(',').map((a: string) => +(a.length == 0 ? '-' : a));

    const equalNumbers = content.length > [...new Set(content)].length;

    const onlyNumbers = content.some(a => isNaN(a));


    const invalid = equalNumbers || onlyNumbers;
    return invalid ? { equalNumbers: equalNumbers, onlyNumbers: onlyNumbers  } : null;
  };
}
