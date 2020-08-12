import { Component, ElementRef, ContentChild} from '@angular/core';

@Component({
  selector: 'app-third',
  template: `<ng-content></ng-content>`
})

export class ThirdComponent  {
  @ContentChild('h', {static: false}) paragraphEl: ElementRef;

  message(text){
    this.paragraphEl.nativeElement.textContent = "hello";
    alert(text + '\nОбязательно нужно наличие <app-third></app-third> в родителе')
  }
}
