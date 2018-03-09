import { Component, OnInit, Input } from '@angular/core';
import { ObjectRepr } from '../models/ro/iresource';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {

  private _property: ObjectRepr;
  @Input()
  set Property(val: ObjectRepr) {
    this._property = val;
  }
  constructor() { }

  ngOnInit() {
  }

}
