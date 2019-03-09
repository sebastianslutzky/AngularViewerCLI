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
        if (v) {
            console.log(v);
            return {'restfulValidated': true};
        }
        console.log('nada');
        return null;
    }


    //    restfulFieldValidator(): ValidatorFn {  
    //     return (c: FormControl) => {  
    //      let isValid = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/.test(c.value);  
    //      if (isValid) {  
    //       return null;  
    //      } else {  
    //       return {  
    //        emailvalidator: {  
    //         valid: false  
    //        }  
    //       };  
    //      }  
}
