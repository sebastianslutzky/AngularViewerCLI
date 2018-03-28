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
  value: string;

  @Input()
  type: string;

  constructor(private componentFactory: ComponentFactoryService, private container: ViewContainerRef, private injector: Injector) {
  }

  ngOnInit(): void {
    const view = this.renderCell(this.type);
    this.componentFactory.createComponent(this.container, view, {'value': this.value});
  }

  renderCell(propertyType: string): any {
    switch (propertyType) {
      case 'java.lang.String': {
        return TextComponent;
      }
      case 'boolean': {
        return CheckboxComponent;
      }
      default: {
        console.warn('don\'t know how to render columns of type: ' + propertyType + '. Viewing as string');
        return TextComponent;
      }
    }
  }
}
