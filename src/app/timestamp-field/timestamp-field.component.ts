import { Component, OnInit, Input, Injector, Output } from '@angular/core';
import { ObjectMember, PropertyDescription } from '../models/ro/iresource';
import { MetamodelService } from '../services/metamodel.service';

@Component({
  selector: 'app-timestamp-field',
  templateUrl: './timestamp-field.component.html',
  styleUrls: ['./timestamp-field.component.css']
})
export class TimeStampFieldComponent implements OnInit {

  private _property: ObjectMember;


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

  ngOnInit() {}
}
