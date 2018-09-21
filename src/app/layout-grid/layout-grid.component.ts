import { Component, OnInit, Input } from '@angular/core';
import { LayoutBaseComponent } from '../layout-row/layout-row.component';
import { isArray } from 'util';

@Component({
  selector: 'app-layout-grid',
  templateUrl: './layout-grid.component.html',
  styleUrls: ['./layout-grid.component.css']
})
export class LayoutGridComponent extends LayoutBaseComponent  implements OnInit {

  private Rows: any;
  
  ngOnInit() {
    this.Rows =  this.asArray(this.LayoutContext.row);
  }

}
