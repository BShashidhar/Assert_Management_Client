import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from './URL';
let CategoryService = class CategoryService {
    constructor(_http) {
        this._http = _http;
        this.categories = [];
    }
    setCategories() {
        return new Promise((res, rej) => {
            return this._http.get(Api.BASE_URL + "/management" + Api.getAllCategory)
                .subscribe(data => {
                this.categories = data.result;
                return res(this.categories);
            }, err => {
                return rej(err);
            });
        });
    }
    getCategories() {
        return this.categories;
    }
    addCategory(item) {
        return new Promise((res, rej) => {
            this._http.post(Api.BASE_URL + "/management" + Api.addCategory, item)
                .subscribe(data => {
                this.categories = data.result;
                return res(this.categories);
            }, err => {
                return rej(err);
            });
        });
    }
    updateCategory(item) {
        return new Promise((res, rej) => {
            this._http.post(Api.BASE_URL + "/management" + Api.updateCategory, item)
                .subscribe(data => {
                this.categories = data.result;
                return res(this.categories);
            }, err => {
                return rej(err);
            });
        });
    }
    deleteCategory(item) {
        return new Promise((res, rej) => {
            this._http.post(Api.BASE_URL + "/management" + Api.deleteCategory, item)
                .subscribe(data => {
                this.categories = data.result;
                return res(this.categories);
            }, err => {
                return rej(err);
            });
        });
    }
};
CategoryService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], CategoryService);
export { CategoryService };
//# sourceMappingURL=category.service.js.map