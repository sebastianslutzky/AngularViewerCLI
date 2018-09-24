import { Component, OnInit, Input } from '@angular/core';
import { isArray } from 'util';
import { MetamodelService } from '../services/metamodel.service';


export class LayoutBaseComponent {
  @Input()
  public LayoutContext: any;
  @Input()
  public ObjectContext: any;

  public constructor(){
    console.log('initializing a ' + this.constructor.name );
  }


  asArray(target: any) {
    if (!target) {
      // console.log('empty array');
      return [];
    }
    if (Array.isArray(target)) {
      // console.log('es array alrady');
      return target;
    }
      // console.log('as array');
    return [target];
  }
}


@Component({
  selector: 'app-layout-row',
  templateUrl: './layout-row.component.html',
  styleUrls: ['./layout-row.component.css']
})
export class LayoutRowComponent extends  LayoutBaseComponent implements OnInit {
  private Cols: any;

  public constructor(private metamodel: MetamodelService) {
    super();
  }

  ngOnInit() {
    this.Cols =  this.asArray(this.LayoutContext.col);
  }

}
