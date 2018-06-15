import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MetamodelService } from '../services/metamodel.service';
import { ObjectMember, ActionDescription, ResourceLink } from '../models/ro/iresource';

@Component({
  selector: 'app-collection-button',
  templateUrl: './collection-button.component.html',
  styleUrls: ['./collection-button.component.css']
})
export class CollectionButtonComponent implements OnInit {

  private _collInstance: ObjectMember;
  private _collDescriptor: ActionDescription;
  Name: string;

  Items: ResourceLink[];

  Quantity: number;
  @Input()
  Context: ObjectMember;
  constructor(private metamodel: MetamodelService) { }
  @Output()
  public onGetObjectRequired: EventEmitter<ResourceLink> = new EventEmitter<ResourceLink>();

  ngOnInit() {
    this.metamodel.getDetails<ObjectMember>(this.Context).then(
      collInstance => {
        this._collInstance = collInstance;
        this.Items = collInstance.value;
        this.Quantity = this.Items.length;

        // store description
        this.metamodel.getDescribedBy(ActionDescription, collInstance).then(collDescriptor => {
            this._collDescriptor = collDescriptor;
            this.Name = collDescriptor.friendlyName;
          }).catch( r => console.log(r));
       }).catch( r1 => console.log(r1));
      }

      openItem(item: ResourceLink) {
        this.onGetObjectRequired.emit(item);
      }
}


