import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/service/employee.service';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.scss']
})
export class EmployeeLoginComponent implements OnInit {

  loginForm: FormGroup
  submitted: boolean = false
  isLoading: boolean = false
  error = ''
  private _notifier: NotifierService
  constructor(
    private _titleService: Title,
    private _fb: FormBuilder,
    private _router: Router,
    private _employeeService: EmployeeService,
    private notifier: NotifierService
  ) {
    this._notifier = this.notifier
    this._titleService.setTitle('Employee Login');
  }

  ngOnInit() {
    this.loginForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get f() {
    return this.loginForm.controls
  }

  onSubmit() {
    this.submitted = true
    if (this.loginForm.invalid) return
    this.isLoading = true
    this._employeeService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(data => {
        this._router.navigate(['/employee/home'])
      }, err => {
        err.status === 500 ? this.error = "Server problem ..!!" : this.error = "Invalid username and password..!!"
        this.isLoading = false
        this._notifier.notify("error", this.error)
      })
  }

}
