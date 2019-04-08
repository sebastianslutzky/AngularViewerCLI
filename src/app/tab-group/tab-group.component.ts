import { Component, OnInit, Input } from '@angular/core';
import { LayoutBaseComponent } from '../layout-row/layout-row.component';

@Component({
  selector: 'app-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.css']
})
export class TabGroupComponent  extends LayoutBaseComponent  implements OnInit {

  @Input()
  Layout: any;

  SelectedTab: any;
  SelectedIndex: number;

  ngOnInit() {
    this.select(0);
  }

  private activeClassIfApplies(index: number) {
    if(index === this.SelectedIndex) {
      return 'active';
    }
    return '';
  }

  private select(index: number) {
    if (this.Layout.tab) {
      this.SelectedIndex = index;
      this.SelectedTab = this.Layout.tab[index];
    }
  }

}
