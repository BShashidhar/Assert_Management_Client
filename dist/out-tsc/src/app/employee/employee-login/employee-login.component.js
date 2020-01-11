import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/service/employee.service';
let EmployeeLoginComponent = class EmployeeLoginComponent {
    constructor(_titleService, _fb, _router, _employeeService, notifier) {
        this._titleService = _titleService;
        this._fb = _fb;
        this._router = _router;
        this._employeeService = _employeeService;
        this.notifier = notifier;
        this.submitted = false;
        this.isLoading = false;
        this.error = '';
        this._notifier = this.notifier;
        this._titleService.setTitle('Employee Login');
    }
    ngOnInit() {
        this.loginForm = this._fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }
    get f() {
        return this.loginForm.controls;
    }
    onSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid)
            return;
        this.isLoading = true;
        this._employeeService.login(this.loginForm.value.username, this.loginForm.value.password)
            .subscribe(data => {
            this._router.navigate(['/employee/home']);
        }, err => {
            err.status === 500 ? this.error = "Server problem ..!!" : this.error = "Invalid username and password..!!";
            this.isLoading = false;
            this._notifier.notify("error", this.error);
        });
    }
};
EmployeeLoginComponent = tslib_1.__decorate([
    Component({
        selector: 'app-employee-login',
        templateUrl: './employee-login.component.html',
        styleUrls: ['./employee-login.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [Title,
        FormBuilder,
        Router,
        EmployeeService,
        NotifierService])
], EmployeeLoginComponent);
export { EmployeeLoginComponent };
//# sourceMappingURL=employee-login.component.js.map