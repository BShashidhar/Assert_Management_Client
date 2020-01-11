import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Api } from './URL';
import { HttpClient } from '@angular/common/http';
let MrrpoService = class MrrpoService {
    constructor(_http) {
        this._http = _http;
    }
    addGrcir(grcir) {
        return this._http.post(Api.BASE_URL + "/management" + Api.addGrcir, grcir);
    }
};
MrrpoService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], MrrpoService);
export { MrrpoService };
//# sourceMappingURL=mrrpo.service.js.map