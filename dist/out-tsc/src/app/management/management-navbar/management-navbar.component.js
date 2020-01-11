import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ManagementService } from 'src/app/service/management.service';
let ManagementNavbarComponent = class ManagementNavbarComponent {
    constructor(_router, _managementService) {
        this._router = _router;
        this._managementService = _managementService;
    }
    ngOnInit() {
        this.name = this._managementService.currentUserValue.username;
    }
    logout() {
        this._managementService.logout();
        this._router.navigate(["/management"]);
    }
};
ManagementNavbarComponent = tslib_1.__decorate([
    Component({
        selector: 'app-management-navbar',
        templateUrl: './management-navbar.component.html',
        styleUrls: ['./management-navbar.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [Router,
        ManagementService])
], ManagementNavbarComponent);
export { ManagementNavbarComponent };
//# sourceMappingURL=management-navbar.component.js.map