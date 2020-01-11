import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EmployeeService } from 'src/app/service/employee.service';
import { Router } from '@angular/router';
import { DepartmentService } from 'src/app/service/department.service';
import { StatusService } from 'src/app/service/status.service';
import { NotifierService } from 'angular-notifier';
import { DataService } from 'src/app/service/data.service';
let EmployeeHomeComponent = class EmployeeHomeComponent {
    constructor(_titleService, _router, _employeeService, _departmentService, _statusService, _dataService, notifier) {
        this._titleService = _titleService;
        this._router = _router;
        this._employeeService = _employeeService;
        this._departmentService = _departmentService;
        this._statusService = _statusService;
        this._dataService = _dataService;
        this.notifier = notifier;
        this.indentPending = [];
        this.indentSubmitted = [];
        this.indents = [];
        this.departments = [];
        this.status = [];
        this.isLoading = false;
        this.maxItem = [5, 10, 25, 50, 100];
        this.p = 1;
        this.items = 5;
        this.key = 'purchase'; //set default
        this.previousKey = '';
        this.reverse = false;
        this._titleService.setTitle('Employee Home');
        this._departmentService.setDepartment().then(data => this.departments = data);
        this._statusService.setStatus().then(data => this.status = data);
        this.emp = this._employeeService.currentEmployeeValue;
        this._notifier = this.notifier;
        if (!this._employeeService.currentEmployeeValue.flag)
            this._router.navigate(['/employee/changepassword']);
    }
    ngOnInit() {
        this.init();
    }
    init() {
        this.isLoading = true;
        new Promise((res, rej) => {
            this._employeeService.getIndentByEmployeeId(this.emp.id)
                .subscribe(data => {
                this.indents = Object.assign([], data);
                res(this.indents);
            }, err => {
                this._notifier.notify('error', "Data fetching problem. Try again..!!");
                res(this.indents);
            });
        }).then((indentList) => {
            this.indentSubmitted = [];
            this.indentPending = [];
            indentList.forEach((indent) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                yield this.status.forEach(s => {
                    if (s.id == indent.status_id)
                        indent["status_name"] = s.name;
                });
                if (indent.flag)
                    this.indentSubmitted.push(indent);
                else
                    this.indentPending.push(indent);
            }));
            this.isLoading = false;
        });
        this.status = this._statusService.getStatus();
    }
    onEdit(item) {
        console.log(item);
        this._dataService.changeData(item);
        this._router.navigate(['/employee/indent']);
    }
    onSubmit(item) {
        this._employeeService.submitIndent({ id: item.id })
            .subscribe(data => {
            this.init();
            setTimeout(() => {
                this._notifier.notify("success", "Indent submitted successfully");
            }, 800);
        }, err => {
            this._notifier.notify("error", "Indent not submitted. Try again..!!");
        });
    }
    onDelete(item) {
        this._employeeService.deleteIndent({ id: item.id })
            .subscribe(data => {
            this.init();
            setTimeout(() => {
                this._notifier.notify("success", "Indent deleted successfully");
            }, 800);
        }, err => {
            this._notifier.notify("error", "Indent not deleted. Try again..!!");
        });
    }
    onMaxItemChange(items) {
        this.items = items;
    }
    sort(key) {
        this.previousKey = this.key;
        this.key = key;
        if (this.previousKey === this.key)
            this.reverse = !this.reverse;
    }
};
EmployeeHomeComponent = tslib_1.__decorate([
    Component({
        selector: 'app-employee-home',
        templateUrl: './employee-home.component.html',
        styleUrls: ['./employee-home.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [Title,
        Router,
        EmployeeService,
        DepartmentService,
        StatusService,
        DataService,
        NotifierService])
], EmployeeHomeComponent);
export { EmployeeHomeComponent };
//# sourceMappingURL=employee-home.component.js.map