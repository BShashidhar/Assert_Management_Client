import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ManagementService } from 'src/app/service/management.service';
import { NotifierService } from 'angular-notifier';
let ManagementLoginComponent = class ManagementLoginComponent {
    constructor(_titleService, _fb, _router, _managementService, notifier) {
        this._titleService = _titleService;
        this._fb = _fb;
        this._router = _router;
        this._managementService = _managementService;
        this.notifier = notifier;
        this.submitted = false;
        this.isLoading = false;
        this.error = '';
        this._notifier = this.notifier;
        this._titleService.setTitle('Management Login');
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
        this._managementService.login(this.loginForm.value.username, this.loginForm.value.password)
            .subscribe(data => {
            this._router.navigate(['/management/home']);
        }, err => {
            err.status === 500 ? this.error = "Server problem" : this.error = "Invalid username and password";
            this.isLoading = false;
            this._notifier.notify("error", this.error);
        });
    }
};
ManagementLoginComponent = tslib_1.__decorate([
    Component({
        selector: 'app-management-login',
        templateUrl: './management-login.component.html',
        styleUrls: ['./management-login.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [Title,
        FormBuilder,
        Router,
        ManagementService,
        NotifierService])
], ManagementLoginComponent);
export { ManagementLoginComponent };
//# sourceMappingURL=management-login.component.js.map