import { Component, OnInit, Input, EventEmitter, Output, Directive, HostListener } from '@angular/core';
import { MetamodelService } from '../services/metamodel.service';
import { ObjectMember, ActionDescription, ResourceLink, IResource } from '../models/ro/iresource';
import { XActionResultList, IXActionResultListItem } from '../models/ro/xaction-result-list';
import { LayoutBaseComponent } from '../layout-row/layout-row.component';

@Component({
  selector: 'app-collection-button',
  templateUrl: './collection-button.component.html',
  styleUrls: ['./collection-button.component.css']
})
export class CollectionButtonComponent extends LayoutBaseComponent implements OnInit {
  private _collInstance: XActionResultList;
  private _collDescriptor: ActionDescription;
  CollectionItems: Array<ObjectMember>;
  CollectionActions: Array<any>;
  Name: string;

  private Id: string;
  private _collection: ObjectMember;
  Items: IXActionResultListItem[];

  Quantity: number;
  @Input()
  Context: ObjectMember;
  constructor(private metamodel: MetamodelService) {
    super();
   }

  @Output()
  public onGetObjectRequired: EventEmitter<ResourceLink> = new EventEmitter<ResourceLink>();

  ngOnInit() {
    // get collection
    const memberId = this.LayoutContext.id;
    this.Id = this.LayoutContext.id;

    // if the collection instance can't be retrieved later, at least we display the id
    this.Name = memberId;
    this._collection = this.metamodel.getObjectMembers(this.ObjectContext)
                          .filter(x => x.memberType === 'collection' && x.id === memberId)[0];

    const collectionActions = [];
    this.LayoutContext.action.forEach(actionLayout => {
      const collectionAction = this.metamodel.getObjectMembers(this.ObjectContext).filter(x => x.id === actionLayout.id)[0];
      collectionActions.push(collectionAction);
    });

    this.CollectionActions = collectionActions;

    // get collection items
    this.loadCollectionItems();
    }
    loadCollectionItems() {
      this.metamodel.getDetails<any>(this._collection, null, true ).then(
        collInstance => {
          const extendedResult = collInstance as Array<any>;
          const collResults = new XActionResultList(extendedResult , new Date());
          this._collInstance = collResults;
          this.Items = collResults.XListItems;
          this.Quantity = collInstance.length;
          // capture friendly name
          this.metamodel.getDescribedBy(ActionDescription, collResults.ROResult).then(collDescriptor => {
              this._collDescriptor = collDescriptor;
              console.log(collDescriptor);
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

      onActionInvoked() {
        this.loadCollectionItems();
      }
}
