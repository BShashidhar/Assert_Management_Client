import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NotifierService } from 'angular-notifier';
import { ManagementService } from 'src/app/service/management.service';
import { CategoryService } from 'src/app/service/category.service';
import { SubCategoryService } from 'src/app/service/subcategory.service';
import { AssetGroupService } from 'src/app/service/assetgroup.service';
import { DivisionService } from 'src/app/service/division.service';
import { PeripheralService } from 'src/app/service/peripheral.service';
import { EmployeeService } from 'src/app/service/employee.service';
import { AssetService } from 'src/app/service/asset.service';
import { DataService } from 'src/app/service/data.service';
import { AssetPeripheralService } from 'src/app/service/asset-peripheral.service';
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/service/project.service';
import { DepartmentService } from 'src/app/service/department.service';
import { LocationService } from 'src/app/service/location.service';
import { VendorService } from 'src/app/service/vendor.service';


@Component({
  selector: 'app-management-asset',
  templateUrl: './management-asset.component.html',
  styleUrls: ['./management-asset.component.scss']
})
export class ManagementAssetComponent implements OnInit {

  categories: any = []
  subcategories: any = []
  assetGroups: any = []
  divisions: any = []
  projects: any = []
  departments: any = []
  asset: any = []
  peripherals: any = []
  employees: any = []
  addedPeripheralsList: any = []
  indents: any = []
  employeeList: any = []
  indentList: any = []
  locations: any = []
  vendors: any = []

  selectedCategory: number
  selectedDepartment: number
  selectedSubCategory: number
  selectedVendor: number
  selectedLocation: number

  lastkeydown: number = 0
  preSubCategory: number = 0
  P: string = '';

  assetIdKey: string
  assetId: string
  key: string
  division: string
  project: string

  assetCommonForm: FormGroup
  assetForm: FormGroup
  peripheralsForm: FormGroup
  locationForm: FormGroup
  vendorForm: FormGroup

  showCategory: boolean = true
  submitted: boolean = false
  saved: boolean = false
  added: boolean = false
  isEdited: boolean = false
  isPeripheralsAdded: boolean = false
  isSubCategoryChanged: boolean = false
  isLoading: boolean = false
  isOpenCategory: boolean = false
  isOpenSubCategory: boolean = false
  isOpenAssetGroup: boolean = false
  isOpenDivision: boolean = false
  isOpenProject: boolean = false
  isOpenVendor: boolean = false
  isOpenLocation: boolean = false
  isOpenPeripherals: boolean = false
  isOpenProjectDiv: boolean = false
  isFieldsDisabled: boolean = false
  acquiredDateValue: Date = null
  indentDateValue: Date = null
  issueDateValue: Date = null
  grcirDateValue: Date = null
  poDateValue: Date = null


  data
  id

  private _notifier: NotifierService


  constructor(
    private _title: Title,
    private _fb: FormBuilder,
    private _managementService: ManagementService,
    private _employeeService: EmployeeService,
    private _assetService: AssetService,
    private _categoryService: CategoryService,
    private _subcategoryService: SubCategoryService,
    private _assetGroupService: AssetGroupService,
    private _departmentService: DepartmentService,
    private _divisionService: DivisionService,
    private _projectService: ProjectService,
    private _locationService: LocationService,
    private _vendorService: VendorService,
    private _peripheralService: PeripheralService,
    private _assetPeripheralService: AssetPeripheralService,
    private _dataService: DataService,
    private _router: Router,
    private notifier: NotifierService
  ) {
    this._notifier = this.notifier
    this._title.setTitle("Asset")

    this.assetCommonForm = this._fb.group({
      category: ['', Validators.required],
      subcategory: ['', Validators.required],
      asset_group: ['', Validators.required],
      division: ['', Validators.required],
      project: [''],
      indent_no: [''],
      indent_date: [''],
      department: ['', Validators.required],
      employee: ['', Validators.required],
      username: [''],
      acquired_date: ['', Validators.required],
      issue_date: ['', Validators.required],
    })

    this.assetForm = this._fb.group({
      asset_id: ['', Validators.required],
      record: ['1', Validators.required],
      asset_details: ['', Validators.required],
      invoice_no: [''],
      model_no: [''],
      serial_no: [''],
      grcir_no: [''],
      grcir_date: [''],
      po_no: [''],
      po_date: [''],
      vendor: ['', Validators.required],
      location: ['', Validators.required],
      remark: [''],
      price: ['', Validators.required],
      warrenty: [''],
      withSerialNo: [''],
      addPeripherals: []
    })

    this.peripheralsForm = this._fb.group({
      peripherals_id: ['', Validators.required],
      serial_no: [''],
    })
    this._departmentService.setDepartment()
    this._employeeService.setEmployee()
    this._vendorService.setVendor()
    this._locationService.setLocation()
  }

  public get f() {
    return this.assetCommonForm.controls
  }

  public get fa() {
    return this.assetForm.controls
  }

  public get v() {
    return this.vendorForm.controls
  }

  public get l() {
    return this.locationForm.controls
  }

  public get p() {
    return this.peripheralsForm.controls
  }

  ngOnInit() {
    this.init()
    new Promise((res, rej) => res(this._dataService.currentData.subscribe(data => this.data = data)))
      .then(() => {
        if (this.data != undefined) {
          this.id = this.data.id
          new Promise(res => {
            this._assetPeripheralService.getPeripheralByAsset(this.data.id)
              .subscribe(data => {
                res(data.result)
              })
          })
            .then((peri: any) => {
              this.addedPeripheralsList = peri
              if (this.addedPeripheralsList.length)
                this.assetForm.controls.addPeripherals.setValue(true)
            })
            .catch(err => {
              console.error(err)
            })
          this.assetCommonForm.patchValue({
            category: this.data.category_id,
            subcategory: this.data.subcategory_id,
            asset_group: this.data.asset_group_id,
            department: this.data.department_id,
            division: this.data.division_id,
            project: this.data.project_id,
            indent_no: this.data.indent_id,
            indent_date: this.data.indent_date,
            employee: this.data.employee_id,
            username: this.data.username,
            acquired_date: this.data.acquired_date,
            issue_date: this.data.issue_date,
          })
          this.assetForm.patchValue({
            asset_id: this.data.asset_id,
            asset_details: this.data.asset_details,
            invoice_no: this.data.invoice_no,
            model_no: this.data.model_no,
            serial_no: this.data.serial_no,
            grcir_no: this.data.grcir_no,
            grcir_date: this.data.grcir_date,
            po_no: this.data.po_no,
            po_date: this.data.po_date,
            vendor: this.data.vendor_id,
            location: this.data.location_id,
            remark: this.data.remark,
            price: this.data.price,
            warrenty: this.data.warrenty,
            // addPeripherals: this.data.
          })
          this.isEdited = true
        }
        this._dataService.changeData(undefined)
      })

  }

  init() {
    this._managementService.setAllIndentNo(data => { this.indents = data })
    setTimeout(() => {
      this.categories = this._categoryService.getCategories()
      this.subcategories = this._subcategoryService.getSubCategories()
      this.assetGroups = this._assetGroupService.getAssetGroup()
      this.divisions = this._divisionService.getDivision()
      this.projects = this._projectService.getProject()
      this.peripherals = this._peripheralService.getPeripherals()
      this.employees = this._employeeService.getEmployee()
      this.departments = this._departmentService.getDepartment()
      this.vendors = this._vendorService.getVendor()
      this.locations = this._locationService.getLocation()

    }, 300)
  }

  getCurrentData() {
    this.departments = this._departmentService.getDepartment()
  }
  setCategory(value) {
    this.selectedCategory = value
  }
  setDepartment(value) {
    this.selectedDepartment = value
  }
  setVendor(value) {
    this.selectedVendor = value
  }
  setLocation(value) {
    this.selectedLocation = value
  }

  setSubCategory(value) {
    let dID = this.assetCommonForm.controls.division.value
    //let pID = this.assetCommonForm.controls.project.value

    this.subcategories.forEach(sub => {
      if (sub.id == value) this.key = sub.key
    })
    this.divisions.forEach(divs => {
      if (divs.id == dID) this.division = divs.name
    })
    this.selectedSubCategory = value
    this.assetIdKey = ""
    this.assetCommonForm.controls.asset_group.setValue("")
  }

  //-------------Enabling project if it is of R&D
  enableProject(e) {
    this.isOpenProjectDiv = false
    this.P = ''
    this.assetCommonForm.controls.indent_date.setValue(null);
    this.assetCommonForm.controls.project.setValue(null);
    let dID = this.assetCommonForm.controls.division.value
    this.divisions.forEach(divs => {
      if (divs.id == dID) this.division = divs.name
    })
    if (this.division == 'RnD') {
      this.isOpenProjectDiv = true
    }
  }

  getAssetId() {
    this.submitted = true
    this.P = ''
    if (this.assetCommonForm.invalid) return
    if (this.isOpenProjectDiv) {
      let pID = this.assetCommonForm.controls.project.value
      this.projects.forEach(proj => {
        if (proj.id == pID) this.project = proj.name
      })
      this.P = this.project + '/'
    }

    let d = this.assetCommonForm.controls.acquired_date.setValue(this.acquiredDateValue);
    let month = this.assetCommonForm.controls.acquired_date.value.getMonth(d);
    let year = this.assetCommonForm.controls.acquired_date.value.getFullYear(d);
    if (month <= 2) {
      year = year - 1;
    }
    this.assetIdKey = "CDACB/" + year + "/" + this.division + "/" + this.P + this.key
    this.assetForm.controls.asset_id.setValue(this.assetIdKey)
    this.assetForm.controls.grcir_date.setValue(this.acquiredDateValue)
  }

  checkPeripherals() {
    this.isPeripheralsAdded = !this.assetForm.controls.addPeripherals.value ? true : false
    this.assetForm.controls.addPeripherals.setValue(false)
    this.isPeripheralsAdded = false
  }

  addPeripheralsList() {
    this.added = true
    if (this.assetCommonForm.invalid) return
    if (this.peripheralsForm.invalid) return
    this.peripherals.forEach(p => {
      if (p.id == this.peripheralsForm.value.peripherals_id) {
        var item = {
          peripherals_id: this.peripheralsForm.value.peripherals_id,
          serial_no: this.peripheralsForm.value.serial_no,
          asset_peripheral_id: p.peripheral_key
        }
        this.addedPeripheralsList.push(item)
      }
    })

  }

  resetPeripherals() {
    this.added = false
    this.peripheralsForm.reset()
    this.addedPeripheralsList = []
  }

  savePeripherals() {
    if (this.addedPeripheralsList.length > 0) {
      this.isPeripheralsAdded = true
      this.assetForm.controls.addPeripherals.setValue(true)
    }
  }

  addAsset() {
    this.submitted = true
    this.saved = true
    if (this.assetForm.invalid) return
    let peripheralsList = []
    var records = this.assetForm.controls.record.value
    if (this.assetForm.controls.withSerialNo.value) records = 1
    if (this.assetForm.controls.addPeripherals.value) {
      peripheralsList = this.addedPeripheralsList
    }

    let assetItem = {
      asset_id: this.assetForm.controls.asset_id.value,
      asset_details: this.assetForm.controls.asset_details.value,
      invoice_no: this.assetForm.controls.invoice_no.value,
      model_no: this.assetForm.controls.model_no.value,
      serial_no: this.assetForm.controls.serial_no.value,
      grcir_no: this.assetForm.controls.grcir_no.value,
      grcir_date: this.assetForm.controls.grcir_date.value,
      po_no: this.assetForm.controls.po_no.value,
      po_date: this.assetForm.controls.po_date.value,
      price: this.assetForm.controls.price.value,
      warrenty: this.assetForm.controls.warrenty.value,
      vendor: this.assetForm.controls.vendor.value,
      location: this.assetForm.controls.location.value,
      remark: this.assetForm.controls.remark.value,
      record: records,
      peripherals: peripheralsList,
      category_id: this.assetCommonForm.controls.category.value,
      subcategory_id: this.assetCommonForm.controls.subcategory.value,
      asset_group_id: this.assetCommonForm.controls.asset_group.value,
      division_id: this.assetCommonForm.controls.division.value,
      department_id: this.assetCommonForm.controls.department.value,
      project_id: this.assetCommonForm.controls.project.value,
      indent_no: this.assetCommonForm.controls.indent_no.value,
      indent_date: this.assetCommonForm.controls.indent_date.value,
      employee_id: this.assetCommonForm.controls.employee.value,
      username: this.assetCommonForm.controls.username.value,
      acquired_date: this.assetCommonForm.controls.acquired_date.value,
      issue_date: this.assetCommonForm.controls.issue_date.value
    }

    if (this.isEdited) {
      assetItem["id"] = this.id
      this._assetService.updateAsset(assetItem)
        .subscribe(data => {
          this._notifier.notify("success", "Asset updated successfully..!!")
          this.isEdited = false
          setTimeout(() => {
            this._router.navigate(["/management/report"])
          }, 3000)
        }, err => {
          this._notifier.notify("error", "Asset updated fail. Please check field and try again..!!")
          this.isEdited = false
          this._router.navigate(["/management/report"])
        })
    }
    else {
      new Promise((res, rej) => {
        this.isLoading = true
        this._assetService.addAsset(assetItem)
          .subscribe(data => {
            res(data.result)
          }, err => {
            rej(err)
          })
      })
        .then(result => {
          this.isFieldsDisabled = true
          var record = this.assetForm.controls.record.value
          if (!this.assetForm.controls.withSerialNo.value) record = 1
          if (record == 1) {
            this.isFieldsDisabled = false
            this.assetForm.controls.withSerialNo.setValue(false)
            this.assetCommonForm.reset()
            this.assetForm.reset()
            this.submitted = false
            this.saved = false
            this.assetForm.controls.record.setValue(record)
          }
          else this.assetForm.controls.record.setValue(record - 1)
          this.assetForm.controls.serial_no.setValue('')
          this.isLoading = false
          this._notifier.notify("success", "Asset added Successfully..!!")
        }).catch(err => {
          this.isLoading = false
          this._notifier.notify("error", "Problem in asset entry. Try again..!!")
        })
    }
  }

  openModal(choice) {
    this.isOpenCategory = false
    this.isOpenSubCategory = false
    this.isOpenAssetGroup = false
    this.isOpenDivision = false
    this.isOpenProject = false
    this.isOpenPeripherals = false
    this.isOpenLocation = false
    this.isOpenVendor = false

    switch (choice) {

      case 1:
        this.isOpenDivision = true;
        break;
      case 2:
        this.isOpenCategory = true;
        break;
      case 3:
        this.isOpenSubCategory = true;
        break;
      case 4:
        this.isOpenAssetGroup = true;
        break;
      case 5:
        this.isOpenProject = true;
        break;
      case 6:
        this.isOpenVendor = true;
        break;
      case 7:
        this.isOpenLocation = true;
        break;
      case 8:
        this.isOpenPeripherals = true;
        break;
      default:
        break;
    }
  }

  close() {
    this.init()
  }

  getAutoCompleteIndentList($event) {
    this.indentList = [];
    if ($event.target.value.length > 2) {
      if ($event.timeStamp - this.lastkeydown > 200) {
        this.indentList = this.searchFromArray(this.indents, $event.target.value)
      }
    }
  }

  searchFromArray(arr, value) {
    let matches = []
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].toLowerCase().match(value.toLowerCase())) {
        matches.push(arr[i])
      }
    }
    return matches
  }

  onDateChange() {
    this.assetCommonForm.controls.issue_date.setValue(this.acquiredDateValue);
  }

  onEmpChange() {
    let empName = "";
    for (var emp of this.employees) {
      if (emp.id == this.assetCommonForm.controls.employee.value) {
        empName = emp.name;
      }
      this.assetCommonForm.controls.username.setValue(empName)
    }
  }

  removePeripheral(peripheral) {
    this.addedPeripheralsList = this.addedPeripheralsList.filter(peri =>
      peri.peripherals_id != peripheral.peripherals_id)
  }
}