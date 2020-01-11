import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from './URL';
let ProjectService = class ProjectService {
    constructor(_http) {
        this._http = _http;
        this.Project = [];
    }
    setProject() {
        return new Promise((res, rej) => {
            this._http.get(Api.BASE_URL + "/management" + Api.getAllProject)
                .subscribe(data => {
                this.Project = data.result;
                res(data.result);
            }, err => {
                rej(err);
            });
        });
    }
    getProject() {
        return this.Project;
    }
    addProject(item) {
        return new Promise((res, rej) => {
            this._http.post(Api.BASE_URL + "/management" + Api.addProject, item)
                .subscribe(data => {
                this.Project = data.result;
                return res(true);
            }, err => {
                return rej(err);
            });
        });
    }
    updateProject(item) {
        return new Promise((res, rej) => {
            this._http.post(Api.BASE_URL + "/management" + Api.updateProject, item)
                .subscribe(data => {
                this.Project = data.result;
                return res(true);
            }, err => {
                return rej(err);
            });
        });
    }
    deleteProject(item) {
        return new Promise((res, rej) => {
            this._http.post(Api.BASE_URL + "/management" + Api.deleteProject, item)
                .subscribe(data => {
                this.Project = data.result;
                return res(true);
            }, err => {
                return rej(err);
            });
        });
    }
};
ProjectService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], ProjectService);
export { ProjectService };
//# sourceMappingURL=project.service.js.map