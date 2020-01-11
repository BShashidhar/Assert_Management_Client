import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SubCategoryService } from 'src/app/service/subcategory.service';
import { CategoryService } from 'src/app/service/category.service';
let SubCategoryComponent = class SubCategoryComponent {
    constructor(_fb, _categoryService, _subcategoryService) {
        this._fb = _fb;
        this._categoryService = _categoryService;
        this._subcategoryService = _subcategoryService;
        this.subcategories = [];
        this.categories = [];
        this.isSubmitted = false;
        this.isLoading = false;
        this.isEditted = false;
        this.successmsg = '';
        this.errormsg = '';
        this.subCategoryForm = this._fb.group({
            category: ['', Validators.required],
            subcategory: ['', Validators.required],
            key: ['', Validators.required]
        });
        this._categoryService.setCategories();
        this._subcategoryService.setSubCategories();
    }
    ngOnInit() {
        setTimeout(() => {
            this.categories = this._categoryService.getCategories();
            this.subcategories = this._subcategoryService.getSubCategories();
        }, 900);
    }
    getCurrentData() {
        this.categories = this._categoryService.getCategories();
    }
    get f() {
        return this.subCategoryForm.controls;
    }
    setCategory(value) {
        this.selectedCategory = value;
        this.successmsg = this.errormsg = '';
    }
    save() {
        this.isSubmitted = true;
        this.successmsg = this.errormsg = '';
        if (this.subCategoryForm.invalid)
            return;
        this.isLoading = true;
        if (this.isEditted) {
            let cat = {
                subcategory_id: this.selectedSubCategory.id,
                category_id: this.subCategoryForm.controls.category.value,
                subcategory_name: this.subCategoryForm.controls.subcategory.value,
                key: this.subCategoryForm.controls.key.value
            };
            new Promise((res, rej) => { res(this._subcategoryService.updateSubCategory(cat)); })
                .then(isUpdated => {
                this.successmsg = "Update successfull..!!";
                this.subcategories = this._subcategoryService.getSubCategories();
                this.isLoading = this.isEditted = false;
            })
                .catch(err => {
                this.errormsg = "Update fail..!!";
                this.isLoading = this.isEditted = false;
            });
        }
        else {
            let item = {
                subcategory_name: this.subCategoryForm.controls.subcategory.value,
                key: this.subCategoryForm.controls.key.value,
                category_id: this.subCategoryForm.controls.category.value
            };
            new Promise((res, rej) => { res(this._subcategoryService.addSubCategory(item)); })
                .then(isAdded => {
                this.successmsg = "Save successfull..!!";
                this.subcategories = this._subcategoryService.getSubCategories();
                this.isLoading = false;
            })
                .catch(err => {
                this.errormsg = "Save fail. Try again..!!";
                this.isLoading = false;
            });
        }
        this.isSubmitted = false;
        this.subCategoryForm.reset();
    }
    edit(item) {
        this.successmsg = this.errormsg = '';
        this.subCategoryForm.patchValue({
            category: item.category_id,
            subcategory: item.name,
            key: item.key
        });
        this.isEditted = true;
        this.selectedSubCategory = item;
    }
    delete(item) {
        this.successmsg = this.errormsg = '';
        this.isLoading = true;
        let subcategory_id = item.id;
        new Promise((res, rej) => { res(this._subcategoryService.deleteSubCategory({ subcategory_id })); })
            .then(isDeleted => {
            this.successmsg = "Delete successfull..!!";
            this.subcategories = this._subcategoryService.getSubCategories();
            this.isLoading = false;
        })
            .catch(err => {
            this.errormsg = "Delete fail. Try again..!!";
            this.isLoading = false;
        });
    }
};
SubCategoryComponent = tslib_1.__decorate([
    Component({
        selector: 'app-sub-category',
        templateUrl: './sub-category.component.html',
        styleUrls: ['./sub-category.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder,
        CategoryService,
        SubCategoryService])
], SubCategoryComponent);
export { SubCategoryComponent };
//# sourceMappingURL=sub-category.component.js.map