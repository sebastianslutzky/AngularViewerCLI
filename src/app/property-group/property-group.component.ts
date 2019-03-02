import { Component, OnInit, Input } from '@angular/core';
import { LayoutBaseComponent } from '../layout-row/layout-row.component';
import { MetamodelService } from '../services/metamodel.service';
import { LayoutService } from '../services/layout.service';
import { ObjectRepr } from '../models/ro/iresource';

@Component({
  selector: 'app-property-group',
  templateUrl: './property-group.component.html',
  styleUrls: ['./property-group.component.css']
})
export class PropertyGroupComponent extends LayoutBaseComponent implements OnInit {
  /**
   * todo:
   *   take the 'unreferenced properties/action' into account
   *      - first for properties, so that all datanucleus stuff is displayed in 'other' (& let Dan know about this diff with wicket viewer)
   */


  @Input()
  public Context: PropertyGroupContext;
  @Input()
  public TabLayout: any;
  @Input()
 
  private _catchAllProperties: boolean;
  private _actionsFromLayout: any[];
  private _propertiesFromLayout: any[];
  public ContextProperties: any[];
  public ContextActions: any[];

  public constructor(private layout: LayoutService, private metamodel: MetamodelService) {
    super();
  }

  ngOnInit() {
    // this._actionsFromLayout = this.LayoutContext.action;
    // this._propertiesFromLayout = this.LayoutContext.property;
    // this._catchAllProperties = this.LayoutContext._unreferencedProperties && this.LayoutContext._unreferencedProperties === 'true';

    // get properties from layout
    this.ContextProperties = this.Context.ContextProperties;
    this.ContextActions = this.Context.ContextActions;
  }

  getActions() {
    if (!this._actionsFromLayout) {
      return null;
    }
    const actionsFromContext = this.ObjectContext.filter(m => m.memberType === 'action');
    const actionsMapped = actionsFromContext.reduce(
      (index, row) => index.set(row['id'], row), new Map);
    return this._actionsFromLayout.map(row => actionsMapped.get(row['id']));
  }

  getMembers(membersFromLayout: any[], memberType: string) {
    if (!membersFromLayout) {
      return null;
    }

    const members = this.metamodel.getObjectMembers(this.ObjectContext);
    const membersFromContext =  members.filter(m => m.memberType === memberType);
    const membersMapped = membersFromContext.reduce((index, row) => index.set(row['id'], row), new Map);
    const filtered =  Array.from([].concat(membersFromLayout)).map(row => membersMapped.get(row['id']));

    // remove nulls
    return filtered.filter(x => x) ;
  }

}

  export class PropertyGroupContext {
    public Name: string;
    public ContextProperties: any[];
    public ContextActions: any[];
    public IsEmpty: boolean;
    private _actionsFromLayout: any[];
    private _propertiesFromLayout: any[];
    private _catchAllProperties: boolean;

   public constructor(public objectContext: ObjectRepr,
    public fieldSet: any, private metamodel: MetamodelService) { 
      this._actionsFromLayout = fieldSet.action;
    this._propertiesFromLayout = fieldSet.property;
    this.Name = fieldSet.name;
    this._catchAllProperties = fieldSet._unreferencedProperties && fieldSet._unreferencedProperties === 'true';

       // get properties from layout
       this.ContextProperties = this.getMembers(this._propertiesFromLayout, 'property');
       this.ContextActions = this.getMembers(this._actionsFromLayout, 'action');
       this.IsEmpty =  this.ContextActions.length + this.ContextProperties.length === 0;
    }

    getMembers(membersFromLayout: any[], memberType: string) {
      if (!membersFromLayout) {
        return [];
      }
  
      const members = this.metamodel.getObjectMembers(this.objectContext);
      const membersFromContext =  members.filter(m => m.memberType === memberType);
      const membersMapped = membersFromContext.reduce((index, row) => index.set(row['id'], row), new Map);
      const filtered =  Array.from([].concat(membersFromLayout)).map(row => membersMapped.get(row['id']));
  
      // remove nulls
      return filtered.filter(x => x) ;
    }

  }
