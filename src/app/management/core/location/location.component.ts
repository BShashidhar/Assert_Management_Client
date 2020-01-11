import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocationService } from 'src/app/service/location.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  locationForm: FormGroup

  locations: any = []

  isSubmitted: boolean = false
  isLoading: boolean = false
  isEditted: boolean = false

  selectedLocation: any

  successmsg: String = ''
  errormsg: String = ''

  constructor(
    private _fb: FormBuilder,
    private _locationService: LocationService
  ) {
    this.locationForm = this._fb.group({
      location: ['', Validators.required]
    })
    this._locationService.setLocation().then(value => this.locations = value)
  }

  ngOnInit() {
    this.locations = this._locationService.getLocation()
  }

  public get l() {
    return this.locationForm.controls
  }

  save() {
    this.isSubmitted = true
    this.successmsg = this.errormsg = ''
    if (this.locationForm.invalid) return
    this.isLoading = true
    if (this.isEditted) {
      let loc = {
        location_id: this.selectedLocation.id,
        location_name: this.locationForm.controls.location.value
      }
      new Promise((res, rej) => { res(this._locationService.updateLocation(loc)) })
        .then((isUpdated) => {
          this.successmsg = "Update successfull..!!"
          this.locations = this._locationService.getLocation()
          this.isLoading = this.isEditted = false
        })
        .catch(err => {
          this.errormsg = "Update fail..!!"
          this.isLoading = this.isEditted = false
        })
    } else {
      let location_name = this.locationForm.controls.location.value
      new Promise((res, rej) => { res(this._locationService.addLocation({ location_name })) })
        .then(isAdded => {
          this.successmsg = "Save successfull..!!"
          this.locations = this._locationService.getLocation();
          this.isLoading = false
        })
        .catch(err => {
          this.errormsg = "Save fail. Try again..!!"
          this.isLoading = false
        })
    }
    this.isSubmitted = false
    this.locationForm.reset()
  }

  edit(item) {
    this.successmsg = this.errormsg = ''
    this.locationForm.patchValue({
      location: item.name
    })
    this.isEditted = true
    this.selectedLocation = item
  }

  delete(item) {
    this.successmsg = this.errormsg = ''
    this.isLoading = true
    let location_id = item.id
    new Promise((res, rej) => { res(this._locationService.deleteLocation({ location_id })) })
      .then(isDeleted => {
        this.successmsg = "Delete successfull..!!"
        this.locations = this._locationService.getLocation();
        this.isLoading = false
      })
      .catch(err => {
        this.errormsg = "Delete fail. Try again..!!"
        this.isLoading = false
      })
  }
}
