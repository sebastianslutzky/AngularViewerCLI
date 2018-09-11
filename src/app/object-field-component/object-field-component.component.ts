import { Component, OnInit, Injector, Output } from '@angular/core';
import { ObjectMember } from '../models/ro/iresource';
import { MetamodelService } from '../services/metamodel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-object-field-component',
  templateUrl: './object-field-component.component.html',
  styleUrls: ['./object-field-component.component.css']
})
export class ObjectFieldComponentComponent  {

  private _property: ObjectMember;

  @Output()
  get Value(): string{
    return this._property.value.title;
  }

  @Output()
  get Url(): string{
    return this._property.value.href;
  }

  @Output()
  get Name(): string{
    return this._property.id;
  }
  constructor(injector: Injector, private metamodel: MetamodelService, private router: Router) {
    this._property = injector.get('context');
   }

  navigate() {
    this.router.navigate([this.getObjectUrl(this.Url)]);
  }

  getObjectUrl(url: string) {
    return 'object/' + encodeURIComponent(url);
  }

}
