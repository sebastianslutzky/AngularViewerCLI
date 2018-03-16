import { Component, OnInit, Input } from '@angular/core';
import { ObjectRepr, ObjectMember, PropertyDescription } from '../models/ro/iresource';
import { MetamodelService } from '../services/metamodel.service';

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


  constructor(private metamodel: MetamodelService) { }

  ngOnInit() {
    this.metamodel.getDetails<ObjectMember>(this._property).subscribe(
      propertyInstance => {
        const extension: any = propertyInstance.extensions;
        this.isBoolean = extension['x-isis-format'] === 'boolean';
        this.metamodel.getDescribedBy(PropertyDescription, propertyInstance).subscribe(
          propertyDescriptor => {this._propertyDescriptor = propertyDescriptor;
          this.Name = this._propertyDescriptor.friendlyName;
        }
       );
     }
    );
  }

}
