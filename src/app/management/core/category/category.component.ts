import { Component, OnInit } from '@angular/core';
import { ManagementService } from 'src/app/service/management.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categoryForm: FormGroup

  categories: any = []
  selectedCategory: any

  isLoading: boolean = false
  isSubmitted: boolean = false
  isEditted: boolean = false
  successmsg: string;
  errormsg: string;

  constructor(
    private _fb: FormBuilder,
    private _categoryService: CategoryService
  ) {
    this.categoryForm = this._fb.group({
      category: ['', Validators.required]
    })
    this._categoryService.setCategories().then(value => this.categories = value)
  }

  ngOnInit() {
    this.categories = this._categoryService.getCategories()
  }

  public get f() {
    return this.categoryForm.controls
  }

  save() {
    this.isSubmitted = true
    this.successmsg = this.errormsg = ''
    if (this.categoryForm.invalid) return
    this.isLoading = true
    if (this.isEditted) {
      let cat = {
        category_id: this.selectedCategory.id,
        category_name: this.categoryForm.controls.category.value
      }
      new Promise((res, rej) => { res(this._categoryService.updateCategory(cat)) })
        .then((isUpdated) => {
          this.successmsg = "Update successfull..!!"
          this.categories = this._categoryService.getCategories()
          this.isLoading = this.isEditted = false
        })
        .catch(err => {
          this.errormsg = "Update fail..!!"
          this.isLoading = this.isEditted = false
        })
    } else {
      let category_name = this.categoryForm.controls.category.value
      new Promise((res, rej) => { res(this._categoryService.addCategory({ category_name })) })
        .then(isAdded => {
          this.successmsg = "Save successfull..!!"
          this.categories = this._categoryService.getCategories();
          this.isLoading = false
        })
        .catch(err => {
          this.errormsg = "Save fail. Try again..!!"
          this.isLoading = false
        })
    }
    this.isSubmitted = false
    this.categoryForm.reset()
  }

  edit(item) {
    this.successmsg = this.errormsg = ''
    this.categoryForm.patchValue({
      category: item.name
    })
    this.isEditted = true
    this.selectedCategory = item
  }

  delete(item) {
    this.successmsg = this.errormsg = ''
    this.isLoading = true
    let category_id = item.id
    new Promise((res, rej) => { res(this._categoryService.deleteCategory({ category_id })) })
      .then(isDeleted => {
        this.successmsg = "Delete successfull..!!"
        this.categories = this._categoryService.getCategories();
        this.isLoading = false
      })
      .catch(err => {
        this.errormsg = "Delete fail. Try again..!!"
        this.isLoading = false
      })
  }
}
