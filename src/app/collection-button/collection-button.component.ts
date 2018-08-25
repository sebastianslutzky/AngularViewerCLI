import { Component, OnInit, Input, EventEmitter, Output, Directive, HostListener } from '@angular/core';
import { MetamodelService } from '../services/metamodel.service';
import { ObjectMember, ActionDescription, ResourceLink } from '../models/ro/iresource';
import { XActionResultList, IXActionResultListItem } from '../models/ro/xaction-result-list';

@Component({
  selector: 'app-collection-button',
  templateUrl: './collection-button.component.html',
  styleUrls: ['./collection-button.component.css']
})
export class CollectionButtonComponent implements OnInit {

  private _collInstance: XActionResultList;
  private _collDescriptor: ActionDescription;
  Name: string;

  Items: IXActionResultListItem[];
  IsTableView = false;

  Quantity: number;
  @Input()
  Context: ObjectMember;
  constructor(private metamodel: MetamodelService) { }
  @Output()
  public onGetObjectRequired: EventEmitter<ResourceLink> = new EventEmitter<ResourceLink>();

  ngOnInit() {
    this.metamodel.getDetails<any>(this.Context, null, true ).then(
      collInstance => {
        const extendedResult = collInstance as Array<any>;
        const collResults = new XActionResultList(extendedResult , new Date());
        this._collInstance = collResults;
        this.Items = collResults.XListItems;
        this.Quantity = collInstance.length;
        // capture friendly name
        this.metamodel.getDescribedBy(ActionDescription, collResults.ROResult).then(collDescriptor => {
            this._collDescriptor = collDescriptor;
            this.Name = collDescriptor.friendlyName;
          }).catch( r => console.log(r));
      }).catch( r1 => console.log(r1));
    }

      openItem(item: ResourceLink) {
        this.onGetObjectRequired.emit(item);
      }

      onMenuOpened(event: Event) {
        event.stopPropagation();
      }
      showAsTable() {
        this.IsTableView = true;
      }
      showAsList() {
        this.IsTableView = false;
      }
}
