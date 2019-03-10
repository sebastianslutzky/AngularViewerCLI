import { Validator, FormControl, ValidatorFn, ValidationErrors, NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { Directive, forwardRef } from '@angular/core';

@Directive({
    selector: '[appRestfulFieldValidator]',
    providers: [
     {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => RestfulFieldValidator),
      multi: true
     }
    ]
   })
export class RestfulFieldValidator implements Validator {
    // validate(c: import("@angular/forms").AbstractControl): import("@angular/forms").ValidationErrors {
    //     throw new Error("Method not implemented.");
    // }    registerOnValidatorChange?(fn: () => void): void {
    //     throw new Error("Method not implemented.");
    // }

    validate(c: AbstractControl): {[key: string]: any} {
        const v = c.value;
        console.log('control:');
        console.log(c);
        console.log('nada');
        if (v) {
            console.log('validating:');
            console.log(v);
            return {'restfulValidated': true};
        }
        return null;
    }
}
