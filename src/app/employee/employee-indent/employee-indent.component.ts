import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/service/employee.service';
import { DepartmentService } from 'src/app/service/department.service';
import { StatusService } from 'src/app/service/status.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-employee-indent',
  templateUrl: './employee-indent.component.html',
  styleUrls: ['./employee-indent.component.scss']
})
export class EmployeeIndentComponent implements OnInit {

  indentForm: FormGroup

  submitted: boolean = false
  isLoading: boolean = false
  isEditted: boolean = false
  budgetYear: String
  department_name: String
  projects = ["ST", "RSY", "ACT"]

  departments = []
  status = []

  data
  emp

  constructor(
    private _titleService: Title,
    private _fb: FormBuilder,
    private _router: Router,
    private _employeeService: EmployeeService,
    private _departmentService: DepartmentService,
    private _statusService: StatusService,
    private _dataService: DataService
  ) {
    this._titleService.setTitle("Employee Indent")
    this.departments = this._departmentService.getDepartment()
    this.status = this._statusService.getStatus()
    var tempDate = new Date()
    if (tempDate.getMonth() < 3)
      this.budgetYear = (tempDate.getFullYear() - 1).toString() + "-" + tempDate.getFullYear().toString()
    this.budgetYear = tempDate.getFullYear().toString() + "-" + (tempDate.getFullYear() + 1).toString()
    this.emp = this._employeeService.currentEmployeeValue
    this.departments.forEach(depart => {
      if (depart.id == this.emp.department_id) this.department_name = depart.name
    })
  }

  ngOnInit() {
    this.indentForm = this._fb.group({
      project_name: ['', Validators.required],
      material_desc: ['', Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      manufacturer: [''],
      suggested_vendors: [''],
      remarks: [''],
    })

    new Promise((res, rej) => res(this._dataService.currentData.subscribe(data => this.data = data))).then(() => {
      if (this.data != undefined) {
        this.indentForm.patchValue({
          project_name: this.projects[Number(this.data.project_id)-1],
          material_desc: this.data.material_desc,
          quantity: this.data.quantity,
          price: this.data.price,
          manufacturer: this.data.manufacturer,
          suggested_vendors: this.data.suggested_vendors,
          remarks: this.data.remarks,
        })
        this.isEditted = true
        this._dataService.changeData(undefined)
      }
    })

  }

  get f() {
    return this.indentForm.controls
  }

  onSubmit() {
    this.submitted = true
    // if (this.indentForm.invalid) return
    var date = new Date()
    var year = date.getFullYear()
    this.isLoading = true
    var indent_no = this.department_name + '/' + year
    var indent = {
      indent_no: indent_no,
      budget_year: this.budgetYear,
      project_id: 1,//this.indentForm.value.project_name,
      employee_id: this.emp.id,
      material_desc: this.indentForm.value.material_desc,
      quantity: this.indentForm.value.quantity,
      price: this.indentForm.value.price,
      manufacturer: this.indentForm.value.manufacturer,
      suggested_vendors: this.indentForm.value.suggested_vendors,
      remarks: this.indentForm.value.remarks,
      status_id: 1,
    }
    this._employeeService.addIndent(indent)
      .subscribe(data => {
        this._router.navigate(['/employee/home'])
      }, err => {
        this.isLoading = false
      })
  }

}
