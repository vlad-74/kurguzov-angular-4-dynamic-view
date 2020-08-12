import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2, Inject, } from '@angular/core';
import { FormControl } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-renderer',
  templateUrl: './renderer.component.html',
})

export class RendererComponent implements OnInit, OnDestroy  {

  @ViewChild('elem', {static: true}) elem: ElementRef;
  @ViewChild('childElem', {static: true}) childElem: ElementRef;
  check: FormControl;

  counter = 0;
  arrDiv = []

  addDiv = "Создать дочерний div"
  removeDiv = "Удалить дочерний div"
  checkText = this.addDiv
  checkColor='primary'
  
  btn: Element
  btnText: Element

  private readonly destroyed$ = new Subject();

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngOnInit() {
    this.check = new FormControl('');
    this.check.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(query => { 
        this.checkText = !query
          ? this.addDiv
          : this.removeDiv
        let oldColor = this.checkColor
        this.checkColor =  query
          ? 'warn'
          : 'primary'

        this.btnText.textContent = this.checkText

        this.btn.classList.remove(oldColor)
        this.btn.classList.add(this.checkColor)

        // this.renderer.addClass(this.test.nativeElement, 'active');
        // this.renderer.setStyle(this.test.nativeElement, 'backgroundColor', 'red');
      });
    const div = this.renderer.createElement('div');
    div.innerHTML = `
      <button data-btn="color" class="mat-raised-button mat-button-base primary">
        <span data-text="text" class="mat-button-wrapper">${this.checkText} </span>
        <div class="mat-button-ripple mat-ripple"></div>
        <div class="mat-button-focus-overlay">
        </div>
      </button> 
    `
    this.renderer.appendChild(this.elem.nativeElement, div)
    this.renderer.listen(div, 'click', (event) => {this.clickBtn(++this.counter);})
  }
  
  ngAfterViewInit() {
    this.btn = this.elem.nativeElement.querySelector('[data-btn]')
    this.btnText = this.btn.querySelector('[data-text]')
  }

  clickBtn(counter) {
    if(this.check.value && this.arrDiv.length){
      const max = this.arrDiv.length - 1
      let elem = this.document.querySelectorAll('[data-id]')[max]
      this.renderer.removeChild(this.childElem.nativeElement, elem)
      this.arrDiv.pop()
      if(!this.arrDiv.length){this.check.setValue(0)}

      return
    }

    if(this.check.value && !this.arrDiv.length){this.check.setValue(0); return}

    const div = this.renderer.createElement('div');
    this.renderer.setAttribute(div, 'data-id', this.counter+'');
    div.innerHTML = `
      <button data-remove="${counter}" data-remove="${counter}" class="mat-raised-button mat-button-base warn">
        <span data-remove="${counter}" class="mat-button-wrapper"># ${counter} удалить</span>
        <div class="mat-button-ripple mat-ripple"></div>
        <div class="mat-button-focus-overlay">
        </div>
      </button>
      <button data-message="${counter}" class="mat-raised-button mat-button-base primary">
        <span data-message="${counter}" class="mat-button-wrapper"># ${counter} cooбщение</span>
        <div class="mat-button-ripple mat-ripple"></div>
        <div class="mat-button-focus-overlay">
        </div>
      </button>
      <br><br>
    `
    this.renderer.appendChild(this.childElem.nativeElement, div);

    this.renderer.listen(div, 'click', (event) => {
      this.checkClick(div, event, counter)
    })
    
    this.arrDiv.push(this.counter)
  }

  checkClick(div, event, counter){
    if(event.target.dataset.remove) {
      this.renderer.removeChild(this.childElem.nativeElement, div)
      this.arrDiv = this.arrDiv.filter(item => item != counter)
    }
    if(event.target.dataset.message) {alert(`Сообщение из div # ${counter}`)}
  }

  onEmitter(data){
    alert('Пришло от дочернего =  @Output() - ' + data)
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
