import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/service/employee.service';
let EmployeeNavbarComponent = class EmployeeNavbarComponent {
    constructor(_router, _employeeService) {
        this._router = _router;
        this._employeeService = _employeeService;
        this.name = "";
    }
    ngOnInit() {
        this.name = this._employeeService.currentEmployeeValue.name;
    }
    logout() {
        this._employeeService.logout();
        this._router.navigate(["/employee"]);
    }
};
EmployeeNavbarComponent = tslib_1.__decorate([
    Component({
        selector: 'app-employee-navbar',
        templateUrl: './employee-navbar.component.html',
        styleUrls: ['./employee-navbar.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [Router,
        EmployeeService])
], EmployeeNavbarComponent);
export { EmployeeNavbarComponent };
//# sourceMappingURL=employee-navbar.component.js.map