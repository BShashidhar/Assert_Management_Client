import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Api } from './URL';
let ManagementService = class ManagementService {
    constructor(_http) {
        this._http = _http;
        this.groups = ["BD", "ACTS", "R&D"];
        this.indents = [];
        this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }
    get currentUserValue() {
        return this.currentUserSubject.value;
    }
    login(username, password) {
        return this._http.post(Api.BASE_URL + Api.managementLogin, { username: username, password: password })
            .pipe(map(user => {
            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
            }
            return user;
        }));
    }
    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
    getGroups() {
        return this.groups;
    }
    setAllIndentNo(callback) {
        this._http.get(Api.BASE_URL + Api.getAllIndentNo)
            .subscribe((data) => {
            this.indents = data.result.map(indent => indent.indent_no);
            callback(this.indents);
        }, err => { callback([]); });
    }
    getAllIndentNo() {
        return this.indents;
    }
};
ManagementService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], ManagementService);
export { ManagementService };
//# sourceMappingURL=management.service.js.map