import { Component, OnInit, Input } from '@angular/core';
import { LayoutBaseComponent } from './layout-row/layout-row.component';
import { PropertyGroupContext } from './property-group/property-group.component';
import { MetamodelService } from './services/metamodel.service';

@Component({
  selector: 'app-layout-column',
  templateUrl: './layout-column.component.html',
  styleUrls: ['./layout-column.component.css']
})
export class LayoutColumnComponent  extends LayoutBaseComponent implements OnInit {
  private TabGroups: any;
  private FieldSets: Array<any>;
  private collections: any;
  private propertyGroups: Array<PropertyGroupContext>;

  private getGroup(name: string): PropertyGroupContext {
    const selected = this.propertyGroups.find(x => x.Name === name);
    return selected;
  }

  public constructor(private metamodel: MetamodelService) {
    super();
  }

  ngOnInit() {
     this.TabGroups = this.asArray(this.LayoutContext.tabGroup);
     this.FieldSets = this.asArray(this.LayoutContext.fieldSet);
     this.collections =  this.asArray(this.LayoutContext.collection) ;

     this.propertyGroups = this.FieldSets.map(fs => new PropertyGroupContext(this.ObjectContext, fs, this.metamodel));
  }
}
