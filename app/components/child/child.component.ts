import { Component } from '@angular/core';
import { SecondComponent } from '../second/second.component';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
})
export class ChildComponent {

  public unique_key: number;
  public parentRef: SecondComponent;

  constructor() { }

  // ИСПОЛЬЗУЕМ МЕТОДЫ РОДИТЕЛЯ
  remove_me() { this.parentRef.remove(this.unique_key) }
}