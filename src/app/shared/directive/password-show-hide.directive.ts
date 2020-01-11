import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPasswordShowHide]'
})
export class PasswordShowHideDirective {

  shown :boolean = false
  constructor(private _elementRef :ElementRef) {
    this.setup()
  }

  setup(){
    const parent = this._elementRef.nativeElement.parentNode
    const div = document.createElement('div')
    div.setAttribute('class', 'input-group-append')
    const span = document.createElement('i')
    span.setAttribute('class','input-group-text fas fa-eye-slash pd10')
    span.addEventListener('click', (event)=>{
      this.toggle(span)
    })
    div.appendChild(span)
    parent.appendChild(div)
  }

  toggle(span: HTMLElement){
    this.shown = !this.shown
    if(this.shown){
      this._elementRef.nativeElement.setAttribute('type','text')
      span.setAttribute('class','input-group-text fas fa-eye pd10')
    }
    else{
      this._elementRef.nativeElement.setAttribute('type','password')
      span.setAttribute('class','input-group-text fas fa-eye-slash pd10')
    }
  }
}

