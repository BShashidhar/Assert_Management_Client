import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/service/employee.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-employee-change-password',
  templateUrl: './employee-change-password.component.html',
  styleUrls: ['./employee-change-password.component.scss']
})
export class EmployeeChangePasswordComponent implements OnInit {

  changePasswordForm: FormGroup
  submitted: boolean = false
  isLoading: boolean = false
  error = ''
  isMatched = false

  // @Output() submitedForm = new EventEmitter<any>()
  _notifier: NotifierService
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _employeeService: EmployeeService,
    private notifier:NotifierService
  ) { 
    this._notifier = this.notifier
  }

  ngOnInit() {
    this.changePasswordForm = this._fb.group({
      currentpass: ['', Validators.required],
      newpass: ['', Validators.required],
      confirmpass: ['', Validators.required]
    })
  }

  get f() {
    return this.changePasswordForm.controls
  }

  onSubmit() {
    this.submitted = true
    this.isLoading = true
    if (this.changePasswordForm.invalid) return
    this._employeeService.changePassword(this.changePasswordForm.value)
      .then(result=>{
        this._router.navigate(['/employee/home'])
      }).catch(err=>{
        err.status === 500 ? this.error = "Server problem ..!!" : this.error = "Invalid current password..!!"
        this.isLoading = false
        this._notifier.notify("error", this.error)
      })
    // this.submitedForm.emit({ currentpass: this.changePasswordForm.value.currentpass, newpass: this.changePasswordForm.value.newpass });
  }

  matchPassword(form) {
    form.newpass.value === form.confirmpass.value ? this.isMatched = true : this.isMatched = false
  }

  parentData(err, data) {
    this.isLoading = false
    this.submitted = false
    if (err) {
      console.log(err)
      if (err.status === 401) this.error = "Current password is not matching. Try again...!"
      else this.error = err
      return
    }
    if (data) {
      console.log("Successfull")
    }
  }
}