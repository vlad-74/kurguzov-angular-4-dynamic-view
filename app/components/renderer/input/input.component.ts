import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-input',
  template: `
  <div class="info">
    <button data-btn="color" (click)="onClick()" class="mat-raised-button mat-button-base primary">
      <span data-text="text" class="mat-button-wrapper">Общение между родительским и дочерним компонентами</span>
      <div class="mat-button-ripple mat-ripple"></div>
      <div class="mat-button-focus-overlay">
      </div>
    </button>

    <a 
      *ngIf="!this.showViewTemplate"
      mat-list-item
      href="https://metanit.com/web/angular2/2.10.php"
      target="_blank">
      <button mat-raised-button color="warn">Output</button>
    </a>
  </div>
  `,
})

export class InputComponent {
  @Input() user: string;
  @Output() onEmitter = new EventEmitter<string>();

  constructor() { }

  onClick(){
    alert('Пришло от родителя = @Input - ' + this.user)
    this.onEmitter.emit('Angular разработчик' );
  }
}
