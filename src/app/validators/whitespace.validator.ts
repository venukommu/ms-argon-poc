import {AbstractControl, FormControl} from '@angular/forms';

export function WhitespaceValidator(control: AbstractControl) {
    let length = 0;
    if (control.value && control.value !== null) {
        length = control.value.length;
    }
    let isWhitespace = null;
    if (length > 0) {
        isWhitespace = (control.value || '').trim().length === 0;
    }
    const isValid = !isWhitespace;
    return isValid ? null : {'whitespace': true};
}
