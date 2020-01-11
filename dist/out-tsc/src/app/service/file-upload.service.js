import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { Api } from './URL';
import { HttpHeaders, HttpClient } from '@angular/common/http';
let FileUploadService = class FileUploadService {
    constructor(_http) {
        this._http = _http;
    }
    downloadFile(file) {
        var body = { filename: file };
        return this._http.post(Api.BASE_URL + Api.downloadFile, body, {
            responseType: 'blob',
            observe: 'response',
            headers: new HttpHeaders().append('Content-Type', 'application/json')
        });
    }
    getAllFileNames() {
        return this._http.get(Api.BASE_URL + Api.getAllFileNames);
    }
};
FileUploadService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], FileUploadService);
export { FileUploadService };
//# sourceMappingURL=file-upload.service.js.map