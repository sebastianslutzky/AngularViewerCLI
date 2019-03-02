import { Component, OnInit, Input, Injector, Output, Pipe, PipeTransform } from '@angular/core';
import { ObjectMember, PropertyDescription } from '../models/ro/iresource';
import { MetamodelService } from '../services/metamodel.service';

@Component({
  selector: 'app-string-field',
  templateUrl: './string-field.component.html',
  styleUrls: ['./string-field.component.css']
})
export class StringFieldComponent implements OnInit {

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

@Pipe({
  name: 'StringFormatterPipe'
})
export class StringFormatterPipe implements PipeTransform {
  transform(val, conditions) {
    console.log('hello from pipe');
    return val;
  }
}
