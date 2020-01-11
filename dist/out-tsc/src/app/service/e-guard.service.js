import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from './employee.service';
let EGuardService = class EGuardService {
    constructor(_employeeService, _router) {
        this._employeeService = _employeeService;
        this._router = _router;
    }
    canActivate(route, state) {
        if (!this._employeeService.currentEmployeeValue) {
            this._router.navigate([`/${route.data.role}/login`]);
            return false;
        }
        return true;
    }
};
EGuardService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [EmployeeService, Router])
], EGuardService);
export { EGuardService };
//# sourceMappingURL=e-guard.service.js.map