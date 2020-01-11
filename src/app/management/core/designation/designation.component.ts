import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DesignationService } from 'src/app/service/designation.service';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss']
})
export class DesignationComponent implements OnInit {

  designationForm: FormGroup

  designations: any = []
  selectedDesignation: any

  isLoading: boolean = false
  isSubmitted: boolean = false
  isEditted: boolean = false
  successmsg: string;
  errormsg: string;

  constructor(
    private _fb: FormBuilder,
    private _designationService: DesignationService
  ) {
    this.designationForm = this._fb.group({
      designation: ['', Validators.required]
    })
    this._designationService.setDesignation().then(value => this.designations = value)
  }

  ngOnInit() {
    this.designations = this._designationService.getDesignation()
  }

  public get f() {
    return this.designationForm.controls
  }

  save() {
    this.isSubmitted = true
    this.successmsg = this.errormsg = ''
    if (this.designationForm.invalid) return
    this.isLoading = true
    if (this.isEditted) {
      let divs = {
        designation_id: this.selectedDesignation.id,
        designation_name: this.designationForm.controls.designation.value
      }
      new Promise((res, rej) => { res(this._designationService.updateDesignation(divs)) })
        .then((isUpdated) => {
          this.successmsg = "Update successfull..!!"
          this.designations = this._designationService.getDesignation()
          this.isLoading = this.isEditted = false
        })
        .catch(err => {
          this.errormsg = "Update fail..!!"
          this.isLoading = this.isEditted = false
        })
    } else {
      let designation_name = this.designationForm.controls.designation.value
      new Promise((res, rej) => { res(this._designationService.addDesignation({ designation_name })) })
        .then(isAdded => {
          this.successmsg = "Save successfull..!!"
          this.designations = this._designationService.getDesignation();
          this.isLoading = false
        })
        .catch(err => {
          this.errormsg = "Save fail. Try again..!!"
          this.isLoading = false
        })
    }
    this.isSubmitted = false
    this.designationForm.reset()
  }

  edit(item) {
    this.successmsg = this.errormsg = ''
    this.designationForm.patchValue({
      designation: item.name
    })
    this.isEditted = true
    this.selectedDesignation = item
  }

  delete(item) {
    this.successmsg = this.errormsg = ''
    this.isLoading = true
    let designation_id = item.id
    new Promise((res, rej) => { res(this._designationService.deleteDesignation({ designation_id })) })
      .then(isDeleted => {
        this.successmsg = "Delete successfull..!!"
        this.designations = this._designationService.getDesignation();
        this.isLoading = false
      })
      .catch(err => {
        this.errormsg = "Delete fail. Try again..!!"
        this.isLoading = false
      })
  }

}
