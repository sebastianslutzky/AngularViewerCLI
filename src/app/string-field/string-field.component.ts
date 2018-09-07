import { Component, OnInit, Input, Injector, Output } from '@angular/core';
import { ObjectMember, PropertyDescription } from '../models/ro/iresource';
import { MetamodelService } from '../services/metamodel.service';

@Component({
  selector: '[string-field]',
  templateUrl: './string-field.component.html',
  styleUrls: ['./string-field.component.css']
})
export class StringFieldComponent implements OnInit {

  private _property: ObjectMember;

  @Input()
  set Property(val: ObjectMember) {
    this._property = val;
  }

  @Output()
  get Value(): string{
    return this._property.value;
  }

  @Output()
  get Name(): string{
    //TODO: return friendly name when it is included in objectmember as an extension
    return this._property.id;
  }
  constructor(injector: Injector, private metamodel: MetamodelService) {
    this._property = injector.get('context');
   }

  ngOnInit() {
    console.log(this._property);
}
