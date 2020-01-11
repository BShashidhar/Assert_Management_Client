import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EmployeeService } from 'src/app/service/employee.service';
import { Router } from '@angular/router';
import { DepartmentService } from 'src/app/service/department.service';
import { StatusService } from 'src/app/service/status.service';
import { NotifierService } from 'angular-notifier';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.scss']
})
export class EmployeeHomeComponent implements OnInit {

  indentPending = []
  indentSubmitted = []
  indents: any = []
  departments: any = []
  status: any = []

  isLoading: boolean = false

  emp

  private _notifier: NotifierService
  constructor(
    private _titleService: Title,
    private _router: Router,
    private _employeeService: EmployeeService,
    private _departmentService: DepartmentService,
    private _statusService: StatusService,
    private _dataService: DataService,
    private notifier: NotifierService
  ) {
    this._titleService.setTitle('Employee Home')
    this._departmentService.setDepartment().then(data => this.departments = data)
    this._statusService.setStatus().then(data => this.status = data)
    this.emp = this._employeeService.currentEmployeeValue
    this._notifier = this.notifier
    if (!this._employeeService.currentEmployeeValue.flag) this._router.navigate(['/employee/changepassword'])
  }

  ngOnInit() {
    this.init()
  }

  init() {
    this.isLoading = true

    new Promise((res, rej) => {
      this._employeeService.getIndentByEmployeeId(this.emp.id)
        .subscribe(data => {
          this.indents = Object.assign([], data)
          res(this.indents)
        }, err => {
          this._notifier.notify('error', "Data fetching problem. Try again..!!")
          res(this.indents)
        })
    }).then((indentList: any[]) => {
      this.indentSubmitted = []
      this.indentPending = []
      indentList.forEach(async (indent) => {
        await this.status.forEach(s => {
          if (s.id == indent.status_id) indent["status_name"] = s.name
        })
        if (indent.flag) this.indentSubmitted.push(indent)
        else this.indentPending.push(indent)
      })
      this.isLoading = false
    })
    this.status = this._statusService.getStatus()
  }


  onEdit(item) {
    console.log(item)
    this._dataService.changeData(item)
    this._router.navigate(['/employee/indent'])
  }

  onSubmit(item) {
    this._employeeService.submitIndent({ id: item.id })
      .subscribe(data => {
        this.init()
        setTimeout(() => {
          this._notifier.notify("success", "Indent submitted successfully")
        }, 800)
      }, err => {
        this._notifier.notify("error", "Indent not submitted. Try again..!!")
      })
  }

  onDelete(item) {
    this._employeeService.deleteIndent({ id: item.id })
      .subscribe(data => {
        this.init()
        setTimeout(() => {
          this._notifier.notify("success", "Indent deleted successfully")
        }, 800)
      }, err => {
        this._notifier.notify("error", "Indent not deleted. Try again..!!")
      })
  }



  maxItem = [5, 10, 25, 50, 100]
  p: number = 1
  items: number = 5

  onMaxItemChange(items) {
    this.items = items
  }

  key: string = 'purchase' //set default
  previousKey: string = ''
  reverse: boolean = false
  sort(key) {
    this.previousKey = this.key
    this.key = key
    if (this.previousKey === this.key)
      this.reverse = !this.reverse

  }

}
