import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CategoryService } from 'src/app/service/category.service';
import { SubCategoryService } from 'src/app/service/subcategory.service';
import { AssetGroupService } from 'src/app/service/assetgroup.service';
import { PeripheralService } from 'src/app/service/peripheral.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { DivisionService } from 'src/app/service/division.service';
import { AssetPeripheralService } from 'src/app/service/asset-peripheral.service';
import { DepartmentService } from 'src/app/service/department.service';
import { DesignationService } from 'src/app/service/designation.service';
import { LocationService } from 'src/app/service/location.service'
import { VendorService } from 'src/app/service/vendor.service'

@Component({
  selector: 'app-management-home',
  templateUrl: './management-home.component.html',
  styleUrls: ['./management-home.component.scss']
})
export class ManagementHomeComponent implements OnInit {

  isLoading: boolean = false
  constructor(
    private _title: Title,
    private _categoryService: CategoryService,
    private _subcategoryService: SubCategoryService,
    private _assetGroupService: AssetGroupService,
    private _divisionService: DivisionService,
    private _peripheralService: PeripheralService,
    private _departmentService: DepartmentService,
    private _designationService: DesignationService,
    private _employeeService: EmployeeService,
    private _locationService: LocationService,
    private _vendorService: VendorService
  ) { 
    this._title.setTitle('Home')
    this._categoryService.setCategories()
    this._subcategoryService.setSubCategories()
    this._assetGroupService.setAssetGroup()
    this._divisionService.setDivision()
    this._peripheralService.setPeripherals()
    this._departmentService.setDepartment()
    this._designationService.setDesignation()
    this._employeeService.setEmployee()
    this._locationService.setLocation()
    this._vendorService.setVendor()
  }

  ngOnInit() {
  }

}
