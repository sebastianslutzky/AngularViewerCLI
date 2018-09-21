import { Component, OnInit, Input } from '@angular/core';
import { isArray } from 'util';

@Component({
  selector: 'app-layout-row',
  templateUrl: './layout-row.component.html',
  styleUrls: ['./layout-row.component.css']
})

export class LayoutBaseComponent {
  @Input()
  public LayoutContext: any;

  constructor(){
    console.log('initializing a ' + this.constructor.name );
  }


  asArray(target: any) {
    if (!target) {
      console.log('empty array');
      return [];
    }
    if (Array.isArray(target)) {
      console.log('es array alrady');
      return target;
    }
      console.log('as array');
    return [target];
  }
}
export class LayoutRowComponent extends LayoutBaseComponent implements OnInit {

  private Cols: any;

  ngOnInit() {
    this.Cols =  this.asArray(this.LayoutContext.col);
  }

}
