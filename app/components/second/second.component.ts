import {
  ComponentRef,
  ComponentFactoryResolver,
  ViewContainerRef,
  ViewChild,
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ChildComponent } from '../child/child.component';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-parent',
  templateUrl: './second.component.html'
})
export class SecondComponent implements OnInit, OnDestroy {
  @ViewChild('viewContainerRef', { static: false, read: ViewContainerRef })
  VCR: ViewContainerRef;

  child_unique_key: number = 0;
  componentsReferences = Array<ComponentRef<ChildComponent>>();

  check: FormControl;
  addComponent = 'Создать дочерний компонент';
  removeComponent = 'Удалить дочерний компонент';
  checkText = this.addComponent;

  private readonly destroyed$ = new Subject();

  constructor(private CFR: ComponentFactoryResolver) {}

  ngOnInit() {
    this.check = new FormControl('');
    this.check.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(query => {
        this.checkText = !query ? this.addComponent : this.removeComponent;
      });
  }

  createComponent() {
    if (!this.check.value) {
      let componentFactory = this.CFR.resolveComponentFactory(ChildComponent);

      let childComponentRef = this.VCR.createComponent(componentFactory);

      let childComponent = childComponentRef.instance;

      // передаем данные в дочерний компонент
      childComponent.unique_key = ++this.child_unique_key;
      childComponent.parentRef = this; // !!!!!ВАЖНО

      this.componentsReferences.push(childComponentRef);
    } else {
      if (!this.componentsReferences.length) {
        this.check.setValue(0);
      }
      let maxElementInArr = this.componentsReferences.map(
        x => x.instance.unique_key
      );
      this.remove(Math.max(...maxElementInArr));
    }
  }

  remove(key: number) {
    if (this.VCR.length < 1) return;

    let componentRef = this.componentsReferences.filter(
      x => x.instance.unique_key == key
    )[0];

    let vcrIndex: number = this.VCR.indexOf(componentRef as any);

    this.VCR.remove(vcrIndex);

    this.componentsReferences = this.componentsReferences.filter(
      x => x.instance.unique_key !== key
    );
    if (!this.componentsReferences.length) {
      this.check.setValue(0);
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
