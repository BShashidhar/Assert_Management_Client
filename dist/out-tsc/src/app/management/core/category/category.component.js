import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/service/category.service';
let CategoryComponent = class CategoryComponent {
    constructor(_fb, _categoryService) {
        this._fb = _fb;
        this._categoryService = _categoryService;
        this.categories = [];
        this.isLoading = false;
        this.isSubmitted = false;
        this.isEditted = false;
        this.categoryForm = this._fb.group({
            category: ['', Validators.required]
        });
        this._categoryService.setCategories().then(value => this.categories = value);
    }
    ngOnInit() {
        this.categories = this._categoryService.getCategories();
    }
    get f() {
        return this.categoryForm.controls;
    }
    save() {
        this.isSubmitted = true;
        this.successmsg = this.errormsg = '';
        if (this.categoryForm.invalid)
            return;
        this.isLoading = true;
        if (this.isEditted) {
            let cat = {
                category_id: this.selectedCategory.id,
                category_name: this.categoryForm.controls.category.value
            };
            new Promise((res, rej) => { res(this._categoryService.updateCategory(cat)); })
                .then((isUpdated) => {
                this.successmsg = "Update successfull..!!";
                this.categories = this._categoryService.getCategories();
                this.isLoading = this.isEditted = false;
            })
                .catch(err => {
                this.errormsg = "Update fail..!!";
                this.isLoading = this.isEditted = false;
            });
        }
        else {
            let category_name = this.categoryForm.controls.category.value;
            new Promise((res, rej) => { res(this._categoryService.addCategory({ category_name })); })
                .then(isAdded => {
                this.successmsg = "Save successfull..!!";
                this.categories = this._categoryService.getCategories();
                this.isLoading = false;
            })
                .catch(err => {
                this.errormsg = "Save fail. Try again..!!";
                this.isLoading = false;
            });
        }
        this.isSubmitted = false;
        this.categoryForm.reset();
    }
    edit(item) {
        this.successmsg = this.errormsg = '';
        this.categoryForm.patchValue({
            category: item.name
        });
        this.isEditted = true;
        this.selectedCategory = item;
    }
    delete(item) {
        this.successmsg = this.errormsg = '';
        this.isLoading = true;
        let category_id = item.id;
        new Promise((res, rej) => { res(this._categoryService.deleteCategory({ category_id })); })
            .then(isDeleted => {
            this.successmsg = "Delete successfull..!!";
            this.categories = this._categoryService.getCategories();
            this.isLoading = false;
        })
            .catch(err => {
            this.errormsg = "Delete fail. Try again..!!";
            this.isLoading = false;
        });
    }
};
CategoryComponent = tslib_1.__decorate([
    Component({
        selector: 'app-category',
        templateUrl: './category.component.html',
        styleUrls: ['./category.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder,
        CategoryService])
], CategoryComponent);
export { CategoryComponent };
//# sourceMappingURL=category.component.js.map