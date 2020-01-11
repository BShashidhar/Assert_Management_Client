import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DesignationService } from 'src/app/service/designation.service';
let DesignationComponent = class DesignationComponent {
    constructor(_fb, _designationService) {
        this._fb = _fb;
        this._designationService = _designationService;
        this.designations = [];
        this.isLoading = false;
        this.isSubmitted = false;
        this.isEditted = false;
        this.designationForm = this._fb.group({
            designation: ['', Validators.required]
        });
        this._designationService.setDesignation().then(value => this.designations = value);
    }
    ngOnInit() {
        this.designations = this._designationService.getDesignation();
    }
    get f() {
        return this.designationForm.controls;
    }
    save() {
        this.isSubmitted = true;
        this.successmsg = this.errormsg = '';
        if (this.designationForm.invalid)
            return;
        this.isLoading = true;
        if (this.isEditted) {
            let divs = {
                designation_id: this.selectedDesignation.id,
                designation_name: this.designationForm.controls.designation.value
            };
            new Promise((res, rej) => { res(this._designationService.updateDesignation(divs)); })
                .then((isUpdated) => {
                this.successmsg = "Update successfull..!!";
                this.designations = this._designationService.getDesignation();
                this.isLoading = this.isEditted = false;
            })
                .catch(err => {
                this.errormsg = "Update fail..!!";
                this.isLoading = this.isEditted = false;
            });
        }
        else {
            let designation_name = this.designationForm.controls.designation.value;
            new Promise((res, rej) => { res(this._designationService.addDesignation({ designation_name })); })
                .then(isAdded => {
                this.successmsg = "Save successfull..!!";
                this.designations = this._designationService.getDesignation();
                this.isLoading = false;
            })
                .catch(err => {
                this.errormsg = "Save fail. Try again..!!";
                this.isLoading = false;
            });
        }
        this.isSubmitted = false;
        this.designationForm.reset();
    }
    edit(item) {
        this.successmsg = this.errormsg = '';
        this.designationForm.patchValue({
            designation: item.name
        });
        this.isEditted = true;
        this.selectedDesignation = item;
    }
    delete(item) {
        this.successmsg = this.errormsg = '';
        this.isLoading = true;
        let designation_id = item.id;
        new Promise((res, rej) => { res(this._designationService.deleteDesignation({ designation_id })); })
            .then(isDeleted => {
            this.successmsg = "Delete successfull..!!";
            this.designations = this._designationService.getDesignation();
            this.isLoading = false;
        })
            .catch(err => {
            this.errormsg = "Delete fail. Try again..!!";
            this.isLoading = false;
        });
    }
};
DesignationComponent = tslib_1.__decorate([
    Component({
        selector: 'app-designation',
        templateUrl: './designation.component.html',
        styleUrls: ['./designation.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder,
        DesignationService])
], DesignationComponent);
export { DesignationComponent };
//# sourceMappingURL=designation.component.js.map