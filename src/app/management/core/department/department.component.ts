import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DepartmentService } from 'src/app/service/department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss']
})
export class DepartmentComponent implements OnInit {

  departmentForm: FormGroup

  departments : any = []
  selectedDepartment: any

  isLoading: boolean = false
  isSubmitted: boolean = false
  isEditted: boolean = false
  successmsg: string;
  errormsg: string;

  constructor(
    private _fb: FormBuilder,
    private _departmentService: DepartmentService
  ) {
    this.departmentForm = this._fb.group({
      department: ['', Validators.required]
    })
    this._departmentService.setDepartment().then(value=> this.departments = value)
  }

  ngOnInit() {
    this.departments = this._departmentService.getDepartment()
  }

  public get f() {
    return this.departmentForm.controls
  }

  save() {
    this.isSubmitted = true
    this.successmsg = this.errormsg = ''
    if (this.departmentForm.invalid) return
    this.isLoading = true
    if (this.isEditted) {
      let divs = {
        department_id: this.selectedDepartment.id,
        department_name: this.departmentForm.controls.department.value
      }
      new Promise((res,rej)=>{res(this._departmentService.updateDepartment(divs))})
      .then((isUpdated)=>{
        this.successmsg = "Update successfull..!!"
        this.departments = this._departmentService.getDepartment()
        this.isLoading = this.isEditted = false
      })
      .catch(err=>{
        this.errormsg = "Update fail..!!"
        this.isLoading = this.isEditted = false
      })
    } else {
      let department_name = this.departmentForm.controls.department.value
      new Promise((res,rej)=>{res(this._departmentService.addDepartment({department_name}))})
      .then(isAdded=>{
        this.successmsg = "Save successfull..!!"
        this.departments = this._departmentService.getDepartment();
        this.isLoading = false
      })
      .catch(err=>{
        this.errormsg = "Save fail. Try again..!!"
        this.isLoading = false
      })
    }
    this.isSubmitted = false
    this.departmentForm.reset()
  }

  edit(item) {
    this.successmsg = this.errormsg = ''
    this.departmentForm.patchValue({
      department: item.name
    })
    this.isEditted = true
    this.selectedDepartment = item
  }

  delete(item) {
    this.successmsg = this.errormsg = ''
    this.isLoading = true
    let department_id = item.id
    new Promise((res,rej)=>{res(this._departmentService.deleteDepartment({department_id}))})
    .then(isDeleted=>{
      this.successmsg = "Delete successfull..!!"
      this.departments = this._departmentService.getDepartment();
      this.isLoading = false
    })
    .catch(err=>{
      this.errormsg = "Delete fail. Try again..!!"
      this.isLoading = false
    })
  }
}
