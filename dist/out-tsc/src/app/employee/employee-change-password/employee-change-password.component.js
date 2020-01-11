import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/service/employee.service';
import { NotifierService } from 'angular-notifier';
let EmployeeChangePasswordComponent = class EmployeeChangePasswordComponent {
    constructor(_fb, _router, _employeeService, notifier) {
        this._fb = _fb;
        this._router = _router;
        this._employeeService = _employeeService;
        this.notifier = notifier;
        this.submitted = false;
        this.isLoading = false;
        this.error = '';
        this.isMatched = false;
        this._notifier = this.notifier;
    }
    ngOnInit() {
        this.changePasswordForm = this._fb.group({
            currentpass: ['', Validators.required],
            newpass: ['', Validators.required],
            confirmpass: ['', Validators.required]
        });
    }
    get f() {
        return this.changePasswordForm.controls;
    }
    onSubmit() {
        this.submitted = true;
        this.isLoading = true;
        if (this.changePasswordForm.invalid)
            return;
        this._employeeService.changePassword(this.changePasswordForm.value)
            .then(result => {
            this._router.navigate(['/employee/home']);
        }).catch(err => {
            err.status === 500 ? this.error = "Server problem ..!!" : this.error = "Invalid current password..!!";
            this.isLoading = false;
            this._notifier.notify("error", this.error);
        });
        // this.submitedForm.emit({ currentpass: this.changePasswordForm.value.currentpass, newpass: this.changePasswordForm.value.newpass });
    }
    matchPassword(form) {
        form.newpass.value === form.confirmpass.value ? this.isMatched = true : this.isMatched = false;
    }
    parentData(err, data) {
        this.isLoading = false;
        this.submitted = false;
        if (err) {
            console.log(err);
            if (err.status === 401)
                this.error = "Current password is not matching. Try again...!";
            else
                this.error = err;
            return;
        }
        if (data) {
            console.log("Successfull");
        }
    }
};
EmployeeChangePasswordComponent = tslib_1.__decorate([
    Component({
        selector: 'app-employee-change-password',
        templateUrl: './employee-change-password.component.html',
        styleUrls: ['./employee-change-password.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder,
        Router,
        EmployeeService,
        NotifierService])
], EmployeeChangePasswordComponent);
export { EmployeeChangePasswordComponent };
//# sourceMappingURL=employee-change-password.component.js.map