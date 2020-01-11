import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/service/category.service';
import { SubCategoryService } from 'src/app/service/subcategory.service';
import { AssetGroupService } from 'src/app/service/assetgroup.service';
let AssetGroupComponent = class AssetGroupComponent {
    constructor(_fb, _categoryService, _subcategoryService, _assetGroupService) {
        this._fb = _fb;
        this._categoryService = _categoryService;
        this._subcategoryService = _subcategoryService;
        this._assetGroupService = _assetGroupService;
        this.categories = [];
        this.subcategories = [];
        this.assetgroup = [];
        this.isSubmitted = false;
        this.isLoading = false;
        this.isEditted = false;
        this.successmsg = '';
        this.errormsg = '';
        this.assetGroupForm = this._fb.group({
            asset_group: ['', Validators.required],
            subcategory: ['', Validators.required],
            category: ['', Validators.required]
        });
        this._categoryService.setCategories();
        this._subcategoryService.setSubCategories();
        this._assetGroupService.setAssetGroup();
    }
    ngOnInit() {
        setTimeout(() => {
            this.categories = this._categoryService.getCategories();
            this.subcategories = this._subcategoryService.getSubCategories();
            this.assetgroup = this._assetGroupService.getAssetGroup();
        }, 900);
    }
    getCurrentData() {
        this.categories = this._categoryService.getCategories();
        this.subcategories = this._subcategoryService.getSubCategories();
    }
    get f() {
        return this.assetGroupForm.controls;
    }
    setCategory(value) {
        this.selectedCategory = value;
        this.successmsg = this.errormsg = '';
    }
    setSubCategory(value) {
        this.selectedSubCategory = value;
        this.successmsg = this.errormsg = '';
    }
    save() {
        this.isSubmitted = true;
        this.successmsg = this.errormsg = '';
        if (this.assetGroupForm.invalid)
            return;
        this.isLoading = true;
        if (this.isEditted) {
            let item = {
                asset_group_id: this.selectedAssetGroup.id,
                asset_group_name: this.assetGroupForm.controls.asset_group.value,
                subcategory_id: this.assetGroupForm.controls.subcategory.value,
            };
            new Promise((res, rej) => { res(this._assetGroupService.updateAssetGroup(item)); })
                .then(isUpdated => {
                this.successmsg = "Update successfull..!!";
                this.assetgroup = this._assetGroupService.getAssetGroup();
                this.isLoading = this.isEditted = false;
            })
                .catch(err => {
                this.errormsg = "Update fail..!!";
                this.isLoading = this.isEditted = false;
            });
        }
        else {
            let item = {
                asset_group_name: this.assetGroupForm.controls.asset_group.value,
                subcategory_id: this.assetGroupForm.controls.subcategory.value
            };
            new Promise((res, rej) => { res(this._assetGroupService.addAssetGroup(item)); })
                .then(isAdded => {
                this.successmsg = "Save successfull..!!";
                this.assetgroup = this._assetGroupService.getAssetGroup();
                this.isLoading = false;
            })
                .catch(err => {
                this.errormsg = "Save fail. Try again..!!";
                this.isLoading = false;
            });
        }
        this.isSubmitted = false;
        this.assetGroupForm.reset();
    }
    edit(item) {
        this.successmsg = this.errormsg = '';
        new Promise((res, rej) => {
            this.subcategories.forEach(ele => {
                if (ele.id == item.subcategory_id)
                    res(ele.category_id);
            });
        }).then(category_id => {
            this.assetGroupForm.patchValue({
                category: category_id,
                subcategory: item.subcategory_id,
                asset_group: item.name,
            });
        });
        this.isEditted = true;
        this.selectedAssetGroup = item;
    }
    delete(item) {
        this.successmsg = this.errormsg = '';
        this.isLoading = true;
        let asset_group_id = item.id;
        new Promise((res, rej) => { res(this._assetGroupService.deleteAssetGroup({ asset_group_id })); })
            .then(isDeleted => {
            this.successmsg = "Delete successfull..!!";
            this.assetgroup = this._assetGroupService.getAssetGroup();
            this.isLoading = false;
        })
            .catch(err => {
            this.errormsg = "Delete fail. Try again..!!";
            this.isLoading = false;
        });
    }
};
AssetGroupComponent = tslib_1.__decorate([
    Component({
        selector: 'app-asset-group',
        templateUrl: './asset-group.component.html',
        styleUrls: ['./asset-group.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder,
        CategoryService,
        SubCategoryService,
        AssetGroupService])
], AssetGroupComponent);
export { AssetGroupComponent };
//# sourceMappingURL=asset-group.component.js.map