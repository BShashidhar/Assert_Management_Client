import * as tslib_1 from "tslib";
import { Directive, ElementRef } from '@angular/core';
let PasswordShowHideDirective = class PasswordShowHideDirective {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        this.shown = false;
        this.setup();
    }
    setup() {
        const parent = this._elementRef.nativeElement.parentNode;
        const div = document.createElement('div');
        div.setAttribute('class', 'input-group-append');
        const span = document.createElement('i');
        span.setAttribute('class', 'input-group-text fas fa-eye-slash pd10');
        span.addEventListener('click', (event) => {
            this.toggle(span);
        });
        div.appendChild(span);
        parent.appendChild(div);
    }
    toggle(span) {
        this.shown = !this.shown;
        if (this.shown) {
            this._elementRef.nativeElement.setAttribute('type', 'text');
            span.setAttribute('class', 'input-group-text fas fa-eye pd10');
        }
        else {
            this._elementRef.nativeElement.setAttribute('type', 'password');
            span.setAttribute('class', 'input-group-text fas fa-eye-slash pd10');
        }
    }
};
PasswordShowHideDirective = tslib_1.__decorate([
    Directive({
        selector: '[appPasswordShowHide]'
    }),
    tslib_1.__metadata("design:paramtypes", [ElementRef])
], PasswordShowHideDirective);
export { PasswordShowHideDirective };
//# sourceMappingURL=password-show-hide.directive.js.map