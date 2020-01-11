import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/service/employee.service';
import { DepartmentService } from 'src/app/service/department.service';
import { DesignationService } from 'src/app/service/designation.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-management-employee',
  templateUrl: './management-employee.component.html',
  styleUrls: ['./management-employee.component.scss']
})
export class ManagementEmployeeComponent implements OnInit {

  employeeForm: FormGroup

  departments: any = []
  designations: any = []
  employees: any = []
  employee: any = []
  selectedEmployee

  submitted: boolean = false
  isLoading: boolean = false
  isEditted: boolean = false

  isOpenDepartment: boolean = false
  isOpenDesignation: boolean = false

  private _notifier: NotifierService

  constructor(
    private _title: Title,
    private _fb: FormBuilder,
    private notifier: NotifierService,
    private _employeeService: EmployeeService,
    private _departmentService: DepartmentService,
    private _designationService: DesignationService,
  ) {

    this._title.setTitle('Employee')
    this._notifier = this.notifier
    this.employeeForm = this._fb.group({
      employee_id: ['', Validators.required],
      employee_name: ['', Validators.required],
      username: [''],
      password: [''],
      department: ['', Validators.required],
      designation: ['', Validators.required]
    })
    this._departmentService.setDepartment()
    this._designationService.setDesignation()
    this._employeeService.setEmployee()
  }

  ngOnInit() {
    this.init()
  }

  init() {
    setTimeout(() => {
      this.departments = this._departmentService.getDepartment()
      this.designations = this._designationService.getDesignation()
      this.employee = this._employeeService.getEmployee()
      this.employees = []
      this.employee.forEach(emp => {
        this.departments.forEach(dept => { if (dept.id == emp.department_id) emp["department_name"] = dept.name })
        this.designations.forEach(design => { if (design.id == emp.designation_id) emp["designation_name"] = design.name })
        this.employees.push(emp)
      })
    }, 250)
  }

  public get f() {
    return this.employeeForm.controls
  }

  save() {
    this.submitted = true
    if (this.employeeForm.invalid) return
    this.isLoading = true
    if (this.isEditted) {
      let emp = {
        id: this.selectedEmployee.id,
        employee_id: this.employeeForm.value.employee_id,
        employee_name: this.employeeForm.value.employee_name,
        username: this.employeeForm.value.username,
        password: this.employeeForm.value.password,
        department: this.employeeForm.value.department,
        designation: this.employeeForm.value.designation
      }
      new Promise((res, rej) => { res(this._employeeService.updateEmployee(emp)) })
        .then(isUpdated => {
          this.isLoading = false
          this.employees = this._employeeService.getEmployee()
          this._notifier.notify("success", "Employee Update successfully..!!")
        })
        .catch(err => {
          this.isLoading = false
          this._notifier.notify("error", "Employee not updated. Please check the fields and try again..!!")
        })
    }
    else {
      new Promise((res, rej) => { res(this._employeeService.addEmployee(this.employeeForm.value)) })
        .then(isAdded => {
          this.isLoading = false
          this.employees = this._employeeService.getEmployee()
          this._notifier.notify("success", "Employee added successfully..!!")
        })
        .catch(err => {
          this.isLoading = false
          this._notifier.notify("error", "Employee not added. Please check the fields and try again..!!")
        })
    }
    this.submitted = this.isEditted = false
    this.employeeForm.reset()
    this.init()
  }

  edit(item) {
    this.isEditted = true
    this.employeeForm.patchValue({
      employee_id: item.emp_id,
      employee_name: item.name,
      username: item.username,
      password: item.password,
      designation: item.designation_id,
      department: item.department_id,
    })
    this.selectedEmployee = item
  }

  delete(item) {
    this.isLoading = true
    let ele = { id: item.id }
    new Promise((res, rej) => { res(this._employeeService.deleteEmployee(ele)) })
      .then(isDeleted => {
        this.isLoading = false
        this.employees = this._employeeService.getEmployee()
        this._notifier.notify("success", "Employee deleted successfully..!!")
      })
      .catch(err => {
        this.isLoading = false
        this._notifier.notify("error", "Employee not deleted. Please try again..!!")
      })
  }

  getCurrentValues(){
  this.designations = this._designationService.getDesignation()
  this.departments = this._departmentService.getDepartment()
  }

  openModal(choice) {
    this.isOpenDepartment = false
    this.isOpenDesignation = false
    switch (choice) {
      case 1:
        this.isOpenDepartment = true
        break;
      case 2:
        this.isOpenDesignation = true
        break;
      default:
        break;
    }
  }

  maxItem = [5, 10, 25, 50, 100]
  p: number = 1
  items: number = 5

  onMaxItemChange(items) {
    this.items = items
  }

  key: string = 'emp_id' //set default
  previousKey: string = ''
  reverse: boolean = false
  sort(key) {
    this.previousKey = this.key
    this.key = key
    if (this.previousKey === this.key)
      this.reverse = !this.reverse

  }
}
