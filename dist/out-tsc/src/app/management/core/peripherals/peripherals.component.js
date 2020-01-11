import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/service/category.service';
import { SubCategoryService } from 'src/app/service/subcategory.service';
import { PeripheralService } from 'src/app/service/peripheral.service';
let PeripheralsComponent = class PeripheralsComponent {
    constructor(_fb, _categoryService, _subcategoryService, _peripheralService) {
        this._fb = _fb;
        this._categoryService = _categoryService;
        this._subcategoryService = _subcategoryService;
        this._peripheralService = _peripheralService;
        this.categories = [];
        this.subcategories = [];
        this.peripherals = [];
        this.isSubmitted = false;
        this.isLoading = false;
        this.isEditted = false;
        this.successmsg = '';
        this.errormsg = '';
        this.peripheralForm = this._fb.group({
            peripheral_name: ['', Validators.required],
            peripheral_key: ['', Validators.required],
            subcategory: ['', Validators.required],
            category: ['', Validators.required]
        });
        this._categoryService.setCategories();
        this._subcategoryService.setSubCategories();
        this._peripheralService.setPeripherals();
    }
    ngOnInit() {
        setTimeout(() => {
            this.categories = this._categoryService.getCategories();
            this.subcategories = this._subcategoryService.getSubCategories();
            this.peripherals = this._peripheralService.getPeripherals();
        }, 900);
    }
    getCurentData() {
        this.categories = this._categoryService.getCategories();
        this.subcategories = this._subcategoryService.getSubCategories();
    }
    get f() {
        return this.peripheralForm.controls;
    }
    setCategory(value) {
        this.selectedCategory = value;
        this.successmsg = this.errormsg = '';
    }
    setSubCategory(value) {
        this.subcategories.forEach(sub => {
            if (sub.id == value)
                this.selectedSubCategory = sub.key;
        });
        this.successmsg = this.errormsg = '';
    }
    save() {
        this.isSubmitted = true;
        this.successmsg = this.errormsg = '';
        if (this.peripheralForm.invalid)
            return;
        this.isLoading = true;
        if (this.isEditted) {
            let item = {
                peripheral_id: this.selectedPeripherals.id,
                peripheral_name: this.peripheralForm.controls.peripheral_name.value,
                key: this.peripheralForm.controls.peripheral_key.value.toUpperCase(),
                peripheral_key: this.selectedPeripherals.key
            };
            new Promise((res, rej) => { res(this._peripheralService.updatePeripherals(item)); })
                .then(isUpdated => {
                this.successmsg = "Update successfull..!!";
                this.peripherals = this._peripheralService.getPeripherals();
                this.isLoading = this.isEditted = false;
            })
                .catch(err => {
                this.errormsg = "Update fail..!!";
                this.isLoading = this.isEditted = false;
            });
        }
        else {
            let item = {
                peripheral_name: this.peripheralForm.controls.peripheral_name.value,
                key: this.peripheralForm.controls.peripheral_key.value.toUpperCase(),
                peripheral_key: this.selectedSubCategory
            };
            new Promise((res, rej) => { res(this._peripheralService.addPeripherals(item)); })
                .then(isAdded => {
                this.successmsg = "Save successfull..!!";
                this.peripherals = this._peripheralService.getPeripherals();
                this.isLoading = false;
            })
                .catch(err => {
                this.errormsg = "Save fail. Try again..!!";
                this.isLoading = false;
            });
        }
        this.isSubmitted = false;
        this.peripheralForm.reset();
    }
    edit(item) {
        this.successmsg = this.errormsg = '';
        new Promise((res, rej) => {
            this.subcategories.forEach(ele => {
                if (ele.key == item.key)
                    res(ele);
            });
        }).then((sub) => {
            this.peripheralForm.patchValue({
                category: sub.category_id,
                subcategory: sub.id,
                peripheral_name: item.name,
                peripheral_key: item.peripheral_key
            });
        });
        this.isEditted = true;
        this.selectedPeripherals = item;
    }
    delete(item) {
        this.successmsg = this.errormsg = '';
        this.isLoading = true;
        let peripheral_id = item.id;
        new Promise((res, rej) => { res(this._peripheralService.deletePeripherals({ peripheral_id })); })
            .then(isDeleted => {
            this.successmsg = "Delete successfull..!!";
            this.peripherals = this._peripheralService.getPeripherals();
            this.isLoading = false;
        })
            .catch(err => {
            this.errormsg = "Delete fail. Try again..!!";
            this.isLoading = false;
        });
    }
};
PeripheralsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-peripherals',
        templateUrl: './peripherals.component.html',
        styleUrls: ['./peripherals.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder,
        CategoryService,
        SubCategoryService,
        PeripheralService])
], PeripheralsComponent);
export { PeripheralsComponent };
//# sourceMappingURL=peripherals.component.js.map