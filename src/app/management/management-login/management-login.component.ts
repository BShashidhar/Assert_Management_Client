import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ManagementService } from 'src/app/service/management.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-management-login',
  templateUrl: './management-login.component.html',
  styleUrls: ['./management-login.component.scss']
})
export class ManagementLoginComponent implements OnInit {
  loginForm: FormGroup
  submitted: boolean = false
  isLoading: boolean = false
  error = ''
  private _notifier: NotifierService
  constructor(
    private _titleService: Title,
    private _fb: FormBuilder,
    private _router: Router,
    private _managementService: ManagementService,
    private notifier: NotifierService
  ) {
    this._notifier = this.notifier
    this._titleService.setTitle('Management Login');
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
    this._managementService.login(this.loginForm.value.username, this.loginForm.value.password)
      .subscribe(data => {
        this._router.navigate(['/management/home'])
      }, err => {

        err.status === 500 ? this.error = "Server problem" : this.error = "Invalid username and password"
        this.isLoading = false
        this._notifier.notify("error", this.error)
      })
  }

}
