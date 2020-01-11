import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DivisionService } from 'src/app/service/division.service';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.scss']
})
export class DivisionComponent implements OnInit {

  divisionForm: FormGroup

  divisions: any = []

  isSubmitted: boolean = false
  isLoading: boolean = false
  isEditted: boolean = false

  selectedDivision

  successmsg: String = ''
  errormsg: String = ''

  constructor(
    private _fb: FormBuilder,
    private _divisionService: DivisionService
  ) {
    this.divisionForm = this._fb.group({
      division: ['', Validators.required]
    })
    this._divisionService.setDivision().then(value => this.divisions = value)
  }

  ngOnInit() {
    this.divisions = this._divisionService.getDivision()
  }

  public get f() {
    return this.divisionForm.controls
  }

  save() {
    this.isSubmitted = true
    this.successmsg = this.errormsg = ''
    if (this.divisionForm.invalid) return
    this.isLoading = true
    if (this.isEditted) {
      let item = {
        division_id: this.selectedDivision.id,
        division_name: this.divisionForm.controls.division.value
      }
      new Promise((res, rej) => { res(this._divisionService.updateDivision(item)) })
        .then((isUpdated) => {
          this.successmsg = "Update successfull..!!"
          this.divisions = this._divisionService.getDivision()
          this.isLoading = this.isEditted = false
        })
        .catch(err => {
          this.errormsg = "Update fail..!!"
          this.isLoading = this.isEditted = false
        })
    } else {
      let division_name = this.divisionForm.controls.division.value
      new Promise((res, rej) => { res(this._divisionService.addDivision({ division_name })) })
        .then(isAdded => {
          this.successmsg = "Save successfull..!!"
          this.divisions = this._divisionService.getDivision();
          this.isLoading = false
        })
        .catch(err => {
          this.errormsg = "Save fail. Try again..!!"
          this.isLoading = false
        })
    }
    this.isSubmitted = false
    this.divisionForm.reset()
  }

  edit(item) {
    this.successmsg = this.errormsg = ''
    this.divisionForm.patchValue({
      division: item.name
    })
    this.isEditted = true
    this.selectedDivision = item
  }

  delete(item) {
    this.successmsg = this.errormsg = ''
    this.isLoading = true
    let division_id = item.id
    new Promise((res, rej) => { res(this._divisionService.deleteDivision({ division_id })) })
      .then(isDeleted => {
        this.successmsg = "Delete successfull..!!"
        this.divisions = this._divisionService.getDivision();
        this.isLoading = false
      })
      .catch(err => {
        this.errormsg = "Delete fail. Try again..!!"
        this.isLoading = false
      })
  }
}
