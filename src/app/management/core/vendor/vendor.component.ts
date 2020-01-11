import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VendorService } from 'src/app/service/vendor.service';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.scss']
})
export class VendorComponent implements OnInit {

  vendorForm: FormGroup

  vendors: any = []

  isSubmitted: boolean = false
  isLoading: boolean = false
  isEditted: boolean = false

  selectedVendor: any

  successmsg: String = ''
  errormsg: String = ''

  constructor(
    private _fb: FormBuilder,
    private _vendorService: VendorService
  ) {
    this.vendorForm = this._fb.group({
      vendor: ['', Validators.required]
    })
    this._vendorService.setVendor().then(value => this.vendors = value)
  }

  ngOnInit() {
    this.vendors = this._vendorService.getVendor()
  }

  public get v() {
    return this.vendorForm.controls
  }

  save() {
    this.isSubmitted = true
    this.successmsg = this.errormsg = ''
    if (this.vendorForm.invalid) return
    this.isLoading = true
    if (this.isEditted) {
      let ven = {
        vendor_id: this.selectedVendor.id,
        vendor_name: this.vendorForm.controls.vendor.value
      }
      new Promise((res, rej) => { res(this._vendorService.updateVendor(ven)) })
        .then((isUpdated) => {
          this.successmsg = "Update successfull..!!"
          this.vendors = this._vendorService.getVendor()
          this.isLoading = this.isEditted = false
        })
        .catch(err => {
          this.errormsg = "Update fail..!!"
          this.isLoading = this.isEditted = false
        })
    } else {
      let vendor_name = this.vendorForm.controls.vendor.value
      new Promise((res, rej) => { res(this._vendorService.addVendor({ vendor_name })) })
        .then(isAdded => {
          this.successmsg = "Save successfull..!!"
          this.vendors = this._vendorService.getVendor();
          this.isLoading = false
        })
        .catch(err => {
          this.errormsg = "Save fail. Try again..!!"
          this.isLoading = false
        })
    }
    this.isSubmitted = false
    this.vendorForm.reset()
  }

  edit(item) {
    this.successmsg = this.errormsg = ''
    this.vendorForm.patchValue({
      vendor: item.name
    })
    this.isEditted = true
    this.selectedVendor = item
  }

  delete(item) {
    this.successmsg = this.errormsg = ''
    this.isLoading = true
    let vendor_id = item.id
    new Promise((res, rej) => { res(this._vendorService.deleteVendor({ vendor_id })) })
      .then(isDeleted => {
        this.successmsg = "Delete successfull..!!"
        this.vendors = this._vendorService.getVendor();
        this.isLoading = false
      })
      .catch(err => {
        this.errormsg = "Delete fail. Try again..!!"
        this.isLoading = false
      })
  }
}
