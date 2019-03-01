import { Component, OnInit, Input, ViewContainerRef, ComponentFactory } from '@angular/core';
import { ObjectRepr, ObjectMember, PropertyDescription } from '../models/ro/iresource';
import { MetamodelService } from '../services/metamodel.service';
import { StringFieldComponent } from '../string-field/string-field.component';
import { ComponentFactoryService } from '../services/component-factory.service';
import { ObjectFieldComponentComponent } from '../object-field-component/object-field-component.component';
import { BooleanFieldComponent } from '../boolean-field/boolean-field.component';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  private _property: ObjectMember;
  private _propertyDescriptor: PropertyDescription;
  @Input()
  set Property(val: ObjectMember) {
    this._property = val;
    this.Value = val.value;
  }

  Value: string;
  Name: string;
  isBoolean: boolean;


  constructor(private metamodel: MetamodelService,
  private container: ViewContainerRef,
  private factory: ComponentFactoryService
  ) { }

  ngOnInit() {
    const fieldComponentType =  this.getFieldCompomentForType(this.getPropertyType(this._property));
    const id = this._property.id;
    //HACK: there should always be a control rendered
    if(fieldComponentType){
    this.factory.createComponent(this.container, fieldComponentType, {context: this._property});
    }
  }

  getFieldCompomentForType(propertyType: string): any {
    switch (propertyType) {
      case 'string':
      case 'long':
      case 'javasqltimestamp':
        return StringFieldComponent;
      case 'object':
        return ObjectFieldComponentComponent;
      case 'boolean':
        return BooleanFieldComponent;
      default:
      throw Error('I don\'t know how to render fields of type ' + propertyType);
    }
  }

  getPropertyType(property: ObjectMember) {

    if (property.extensions) {
      return property.extensions['x-isis-format'];
    }

    return 'object';
  }
}

