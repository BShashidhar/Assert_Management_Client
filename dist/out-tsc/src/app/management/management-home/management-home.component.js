import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CategoryService } from 'src/app/service/category.service';
import { SubCategoryService } from 'src/app/service/subcategory.service';
import { AssetGroupService } from 'src/app/service/assetgroup.service';
import { PeripheralService } from 'src/app/service/peripheral.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { DivisionService } from 'src/app/service/division.service';
import { DepartmentService } from 'src/app/service/department.service';
import { DesignationService } from 'src/app/service/designation.service';
let ManagementHomeComponent = class ManagementHomeComponent {
    constructor(_title, _categoryService, _subcategoryService, _assetGroupService, _divisionService, _peripheralService, _departmentService, _designationService, _employeeService) {
        this._title = _title;
        this._categoryService = _categoryService;
        this._subcategoryService = _subcategoryService;
        this._assetGroupService = _assetGroupService;
        this._divisionService = _divisionService;
        this._peripheralService = _peripheralService;
        this._departmentService = _departmentService;
        this._designationService = _designationService;
        this._employeeService = _employeeService;
        this.isLoading = false;
        this._title.setTitle('Home');
        this._categoryService.setCategories();
        this._subcategoryService.setSubCategories();
        this._assetGroupService.setAssetGroup();
        this._divisionService.setDivision();
        this._peripheralService.setPeripherals();
        this._departmentService.setDepartment();
        this._designationService.setDesignation();
        this._employeeService.setEmployee();
    }
    ngOnInit() {
    }
};
ManagementHomeComponent = tslib_1.__decorate([
    Component({
        selector: 'app-management-home',
        templateUrl: './management-home.component.html',
        styleUrls: ['./management-home.component.scss']
    }),
    tslib_1.__metadata("design:paramtypes", [Title,
        CategoryService,
        SubCategoryService,
        AssetGroupService,
        DivisionService,
        PeripheralService,
        DepartmentService,
        DesignationService,
        EmployeeService])
], ManagementHomeComponent);
export { ManagementHomeComponent };
//# sourceMappingURL=management-home.component.js.map