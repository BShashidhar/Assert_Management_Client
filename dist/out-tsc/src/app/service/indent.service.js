import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from './URL';
let IndentService = class IndentService {
    constructor(_http) {
        this._http = _http;
        this.indents = [];
    }
    setIndents(key, value) {
        if (key == "employee_id") {
            return this._http.post(Api.BASE_URL + Api.addIndent, { key: value });
        }
    }
};
IndentService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], IndentService);
export { IndentService };
//# sourceMappingURL=indent.service.js.map