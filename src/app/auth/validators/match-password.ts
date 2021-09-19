import { Injectable } from '@angular/core';
import { Validator, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class MatchPassword implements Validator {

  // ValidatorFn type function
  validate(formGroup: FormGroup) {

    // get field values
    const { password, passwordConfirmation } = formGroup.value;

    // check field values
    if (password === passwordConfirmation) {
      return null;
    } else {
      return { passwordsDontMatch: true };
    }
  }
}
