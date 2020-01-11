import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DivisionService } from 'src/app/service/division.service';
let DivisionComponent = class DivisionComponent {
    constructor(_fb, _divisionService) {
        this._fb = _fb;
        this._divisionService = _divisionService;
        this.divisions = [];
        this.isSubmitted = false;
        this.isLoading = false;
        this.isEditted = false;
        this.successmsg = '';
        this.errormsg = '';
        this.divisionForm = this._fb.group({
            division: ['', Validators.required]
        });
        this._divisionService.setDivision().then(value => this.divisions = value);
    }
    ngOnInit() {
        this.divisions = this._divisionService.getDivision();
    }
    get f() {
        return this.divisionForm.controls;
    }
    save() {
        this.isSubmitted = true;
        this.successmsg = this.errormsg = '';
        if (this.divisionForm.invalid)
            return;
        this.isLoading = true;
        if (this.isEditted) {
            let item = {
                division_id: this.selectedDivision.id,
                division_name: this.divisionForm.controls.division.value
            };
            new Promise((res, rej) => { res(this._divisionService.updateDivision(item)); })
                .then((isUpdated) => {
                this.successmsg = "Update successfull..!!";
                this.divisions = this._divisionService.getDivision();
                this.isLoading = this.isEditted = false;
            })
                .catch(err => {
                this.errormsg = "Update fail..!!";
                this.isLoading = this.isEditted = false;
            });
        }
        else {
            let division_name = this.divisionForm.controls.division.value;
            new Promise((res, rej) => { res(this._divisionService.addDivision({ division_name })); })
                .then(isAdded => {
                this.successmsg = "Save successfull..!!";
                this.divisions = this._divisionService.getDivision();
                this.isLoading = false;
            })
                .catch(err => {
                this.errormsg = "Save fail. Try again..!!";
                this.isLoading = false;
            });
        }
        this.isSubmitted = false;
        this.divisionForm.reset();
    }
    edit(item) {
        this.successmsg = this.errormsg = '';
        this.divisionForm.patchValue({
            division: item.name
        });
        this.isEditted = true;
        this.selectedDivision = item;
    }
    delete(item) {
        this.successmsg = this.errormsg = '';
        this.isLoading = true;
        let division_id = item.id;
        new Promise((res, rej) => { res(this._divisionService.deleteDivision({ division_id })); })
            .then(isDeleted => {
            this.successmsg = "Delete successfull..!!";
            this.divisions = this._divisionService.getDivision();
            this.isLoading = false;
        })
            .catch(err => {
            this.errormsg = "Delete fail. Try again..!!";
            this.isLoading = false;
        });
    }
};
DivisionComponent = tslib_1.__decorate([
    Component({
        selector: 'app-division',
        templateUrl: './division.component.html',
        styleUrls: ['./division.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [FormBuilder,
        DivisionService])
], DivisionComponent);
export { DivisionComponent };
//# sourceMappingURL=division.component.js.map