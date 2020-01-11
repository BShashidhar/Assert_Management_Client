import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Api } from './URL';
let SubCategoryService = class SubCategoryService {
    constructor(_http) {
        this._http = _http;
        this.subcategories = [];
    }
    setSubCategories() {
        return new Promise((res, rej) => {
            this._http.get(Api.BASE_URL + "/management" + Api.getAllSubCategory)
                .subscribe(data => {
                this.subcategories = data.result;
                res(data.result);
            }, err => {
                rej(err);
            });
        });
    }
    getSubCategories() {
        return this.subcategories;
    }
    addSubCategory(item) {
        return new Promise((res, rej) => {
            this._http.post(Api.BASE_URL + "/management" + Api.addSubCategory, item)
                .subscribe(data => {
                this.subcategories = data.result;
                return res(true);
            }, err => {
                return rej(err);
            });
        });
    }
    updateSubCategory(item) {
        return new Promise((res, rej) => {
            this._http.post(Api.BASE_URL + "/management" + Api.updateSubCategory, item)
                .subscribe(data => {
                this.subcategories = data.result;
                return res(true);
            }, err => {
                return rej(err);
            });
        });
    }
    deleteSubCategory(item) {
        return new Promise((res, rej) => {
            this._http.post(Api.BASE_URL + "/management" + Api.deleteSubCategory, item)
                .subscribe(data => {
                this.subcategories = data.result;
                return res(true);
            }, err => {
                return rej(err);
            });
        });
    }
};
SubCategoryService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__metadata("design:paramtypes", [HttpClient])
], SubCategoryService);
export { SubCategoryService };
//# sourceMappingURL=subcategory.service.js.map