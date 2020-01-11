import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ManagementService } from './management.service';
let MGuardService = class MGuardService {
    constructor(_managementService, _router) {
        this._managementService = _managementService;
        this._router = _router;
    }
    canActivate(route, state) {
        if (!this._managementService.currentUserValue) {
            this._router.navigate([`/${route.data.role}/login`]);
            return false;
        }
        return true;
    }
};
MGuardService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [ManagementService, Router])
], MGuardService);
export { MGuardService };
//# sourceMappingURL=m-guard.service.js.map