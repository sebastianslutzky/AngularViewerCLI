import { Component, OnInit, ViewContainerRef, Injector, Input } from '@angular/core';
import { ComponentFactoryService } from '../services/component-factory.service';
import { TextComponent } from '../text/text.component';
import { inject } from '@angular/core/testing';
import { CheckboxComponent } from '../checkbox/checkbox.component';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {
  @Input()
  value: any;

  @Input()
  type: string;

  @Input()
  set testing(val: any){
    console.log('testing');
    console.log(val);
  }

  constructor(private componentFactory: ComponentFactoryService, private container: ViewContainerRef, private injector: Injector) {
  }

  ngOnInit(): void {
    const view = this.renderCell(this.type, this.value);
    this.componentFactory.createComponent(this.container, view.control, {'value': view.value});
  }

  renderCell(propertyType: string, value: any): any {
    switch (propertyType) {
      case 'java.lang.String': {
        return {control: TextComponent, value: value};
      }
      case 'boolean': {
        return {control: CheckboxComponent, value: value};
      }
      default: {
        console.warn('don\'t know how to render columns of type: ' + propertyType + '. Viewing as string');
        return {control: TextComponent, value: value.title};
      }
    }
  }
}
