import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-employee-navbar',
  templateUrl: './employee-navbar.component.html',
  styleUrls: ['./employee-navbar.component.scss']
})
export class EmployeeNavbarComponent implements OnInit {

  name: String = ""

  constructor(
    private _router: Router,
    private _employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.name = this._employeeService.currentEmployeeValue.name
  }

  logout() {
    this._employeeService.logout()
    this._router.navigate(["/employee"])
  }

}
