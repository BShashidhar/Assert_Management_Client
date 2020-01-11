import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/service/category.service';
import { SubCategoryService } from 'src/app/service/subcategory.service';
import { AssetGroupService } from 'src/app/service/assetgroup.service';

@Component({
  selector: 'app-asset-group',
  templateUrl: './asset-group.component.html',
  styleUrls: ['./asset-group.component.scss']
})
export class AssetGroupComponent implements OnInit {

  assetGroupForm: FormGroup

  categories: any = []
  subcategories: any = []
  assetgroup: any = []

  isSubmitted: boolean = false
  isLoading: boolean = false
  isEditted: boolean = false

  selectedCategory: Number
  selectedSubCategory: Number
  selectedAssetGroup

  successmsg: String = ''
  errormsg: String = ''

  constructor(
    private _fb: FormBuilder,
    private _categoryService: CategoryService,
    private _subcategoryService: SubCategoryService,
    private _assetGroupService: AssetGroupService,
  ) {
    this.assetGroupForm = this._fb.group({
      asset_group: ['', Validators.required],
      subcategory: ['', Validators.required],
      category: ['', Validators.required]
    })
    this._categoryService.setCategories()
    this._subcategoryService.setSubCategories()
    this._assetGroupService.setAssetGroup()
  }

  ngOnInit() {
    setTimeout(()=>{
      this.categories = this._categoryService.getCategories()
      this.subcategories = this._subcategoryService.getSubCategories()
      this.assetgroup = this._assetGroupService.getAssetGroup()
    },900)
  }
  getCurrentData(){
    this.categories = this._categoryService.getCategories()
    this.subcategories = this._subcategoryService.getSubCategories()
  }
  public get f() {
    return this.assetGroupForm.controls
  }

  setCategory(value) {
    this.selectedCategory = value
    this.successmsg = this.errormsg = ''
  }

  setSubCategory(value) {
    this.selectedSubCategory = value
    this.successmsg = this.errormsg = ''
  }

  save() {
    this.isSubmitted = true
    this.successmsg = this.errormsg = ''
    if (this.assetGroupForm.invalid) return
    this.isLoading = true
    if (this.isEditted) {
      let item = {
        asset_group_id: this.selectedAssetGroup.id,
        asset_group_name: this.assetGroupForm.controls.asset_group.value,
        subcategory_id: this.assetGroupForm.controls.subcategory.value,
      }
      new Promise((res, rej) => { res(this._assetGroupService.updateAssetGroup(item)) })
        .then(isUpdated => {
          this.successmsg = "Update successfull..!!"
          this.assetgroup = this._assetGroupService.getAssetGroup()
          this.isLoading = this.isEditted = false
        })
        .catch(err => {
          this.errormsg = "Update fail..!!"
          this.isLoading = this.isEditted = false
        })
    } else {
      let item = {
        asset_group_name: this.assetGroupForm.controls.asset_group.value,
        subcategory_id: this.assetGroupForm.controls.subcategory.value
      }
      new Promise((res, rej) => { res(this._assetGroupService.addAssetGroup(item)) })
        .then(isAdded => {
          this.successmsg = "Save successfull..!!"
          this.assetgroup = this._assetGroupService.getAssetGroup()
          this.isLoading = false
        })
        .catch(err => {
          this.errormsg = "Save fail. Try again..!!"
          this.isLoading = false
        })
    }
    this.isSubmitted = false
    this.assetGroupForm.reset()
  }

  edit(item) {
    this.successmsg = this.errormsg = ''
    new Promise((res, rej) => {
      this.subcategories.forEach(ele => {
        if (ele.id == item.subcategory_id)
          res(ele.category_id)
      })
    }).then(category_id => {
      this.assetGroupForm.patchValue({
        category: category_id,
        subcategory: item.subcategory_id,
        asset_group: item.name,
      })
    })
    this.isEditted = true
    this.selectedAssetGroup = item
  }

  delete(item) {
    this.successmsg = this.errormsg = ''
    this.isLoading = true
    let asset_group_id = item.id
    new Promise((res, rej) => { res(this._assetGroupService.deleteAssetGroup({ asset_group_id })) })
      .then(isDeleted => {
        this.successmsg = "Delete successfull..!!"
        this.assetgroup = this._assetGroupService.getAssetGroup();
        this.isLoading = false
      })
      .catch(err => {
        this.errormsg = "Delete fail. Try again..!!"
        this.isLoading = false
      })
  }
}
