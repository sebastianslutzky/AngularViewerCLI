import { Component, OnInit, Input, ValueProvider } from '@angular/core';
import { isArray } from 'util';
import { MetamodelService } from '../services/metamodel.service';
import { ObjectLayout } from '../services/layout.service';
import { ObjectRepr } from '../models/ro/iresource';


export class LayoutBaseComponent {

  private _layoutContext: ObjectLayout;
  @Input()
  public set LayoutContext(value: any){
    this._layoutContext = value;
  }
  public get LayoutContext(): any {
    return this._layoutContext;
  }

  private _objectContext: ObjectRepr;
  @Input()
  public set ObjectContext(value: ObjectRepr){
    this._objectContext = value;
  }
  public get ObjectContext(): ObjectRepr {
    return this._objectContext;
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
    this.Cols =  this.asArray(this.LayoutContext.cols);
  }

}
