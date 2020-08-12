import { Component, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { ThirdComponent} from '../third/third.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})

export class MainComponent implements AfterViewInit {
  innerHTML = `<H1>ngTemplateOutlet & context / ViewChild & #<H1>`;
  showViewTemplate = true;
  bool = false;
  start = false

  @ViewChild('tmplStart', {static: false}) templateStart: TemplateRef<any>;
  @ViewChild('tmplHidden', {static: false}) templateHidden: TemplateRef<any>;
  @ViewChild('tmplCont', {static: false}) templateCont: TemplateRef<any>;
  liveTemplate: TemplateRef<any>;

  @ViewChild(ThirdComponent, {static: false}) childComponent: ThirdComponent;

  context = {
      $implicit: {
        name: "Владимир",
        surname: "Геннадьевич",
        family: "Кургузов"
      }
    }

  constructor() { }

  toggleTemplateSelected() {
    this.showViewTemplate = !this.showViewTemplate;
    if (this.showViewTemplate){
      if(this.start) {
        this.liveTemplate = this.templateCont
        this.bool = false
        this.innerHTML = '<H1>Динамический компонент<H1>'
      } else {
        this.liveTemplate = this.templateStart
        this.bool = false
      }
    } else {
      this.liveTemplate = this.templateHidden;
      setTimeout(()=>{this.bool = true})
      this.start = true
      this.innerHTML = '<H1>Renderer2<H1>'
    }
  }

  message(){
    this.childComponent.message('Сообщение из родителя в дочерний компонент')
  }

  startTemplate(){
    this.start = false
    this.showViewTemplate = true
    this.liveTemplate = this.templateStart;
    this.innerHTML = `<H1>ngTemplateOutlet & context / ViewChild & #<H1>`;
  }

  ngAfterViewInit() {
    setTimeout(()=>{ this.liveTemplate = this.templateStart; })
  }
}
