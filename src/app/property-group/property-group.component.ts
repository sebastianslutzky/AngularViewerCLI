import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-property-group',
  templateUrl: './property-group.component.html',
  styleUrls: ['./property-group.component.css']
})
export class PropertyGroupComponent implements OnInit {
  /**
   * todo:
   *   take the 'unreferenced properties/action' into account
   *      - first for properties, so that all datanucleus stuff is displayed in 'other' (& let Dan know about this diff with wicket viewer)
   */

  @Input()
  public Layout: any[];

  @Input()
  public Context: any;
  @Input()
  public TabLayout: any;
  @Input()
  public Name: string;
  private _catchAllProperties: boolean;
  private _actionsFromLayout: any[];
  private _propertiesFromLayout: any[];
  public ContextProperties: any[];
  public ContextActions: any[];
  constructor() {
  }

  ngOnInit() {
    const group =  this.TabLayout.row.col;
    this._actionsFromLayout = group.fieldSet.action;
    this._propertiesFromLayout = group.fieldSet.property;
    this._catchAllProperties = group.fieldSet._unreferencedProperties && group.fieldSet._unreferencedProperties === 'true';

    this.ContextProperties = this.getMembers(this._propertiesFromLayout, 'property');
    this.ContextActions = this.getMembers(this._actionsFromLayout, 'action');

   const test = this.getUnreferencedMembers('property');
  }

  getActions() {
    if(!this._actionsFromLayout){
      return null;
    }
    const actionsFromContext = this.Context.filter(m => m.memberType === 'action');
    const actionsMapped = actionsFromContext.reduce(
      (index, row) => index.set(row['id'], row), new Map);
    return this._actionsFromLayout.map(row => actionsMapped.get(row['_id']));
  }

  getMembers(membersFromLayout: any[], memberType: string) {
    if(!membersFromLayout){
      return null;
    }
    const membersFromContext = this.Context.filter(m => m.memberType === memberType);
    const membersMapped = membersFromContext.reduce(
      (index, row) => index.set(row['id'], row), new Map);
    const filtered =  Array.from([].concat(membersFromLayout)).map(row => membersMapped.get(row['_id']));

    // remove nulls
    return filtered.filter(x => x) ;
  }

  getUnreferencedMembers(memberType: string) {
    let membersFromContext = this.Context.filter(m => m.memberType === memberType);
    this.Layout.forEach(tab => {
      let layoutMembers: any[] =  tab.row.col.fieldSet[memberType];
      if (!Array.isArray(layoutMembers)) {
        layoutMembers = [layoutMembers];
      }
      membersFromContext = membersFromContext.filter(mc => !(layoutMembers.some(lp => lp && lp._id === mc.id)));
    });
    return membersFromContext;
  }
}
