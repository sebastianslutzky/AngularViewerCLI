import { Component, OnInit, Input } from '@angular/core';
import { LayoutBaseComponent } from './layout-row/layout-row.component';

@Component({
  selector: 'app-layout-column',
  templateUrl: './layout-column.component.html',
  styleUrls: ['./layout-column.component.css']
})
export class LayoutColumnComponent  extends LayoutBaseComponent implements OnInit {
  private TabGroups: any;
  private FieldSets: any;
  private collections: any;

  private isNotEmpty(tab: any): boolean {
    const row = tab.row[0];
    if (!row) { return false; }

    const cols = row.cols[0];
    if (!cols) { return false; }

  if (!cols.col.fieldSet) {return false; }
   const fieldSet = cols.col.fieldSet[0];

   if (!fieldSet) { return false; }

   return fieldSet.property || fieldSet.action;
  }

  LayoutColumnComponent() {

  }
  ngOnInit() {
     this.TabGroups = this.asArray(this.LayoutContext.tabGroup);
     this.FieldSets = this.asArray(this.LayoutContext.fieldSet);
      this.collections =  this.asArray(this.LayoutContext.collection) ;
  }
}
