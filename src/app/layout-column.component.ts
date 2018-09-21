import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-layout-column',
  templateUrl: './layout-column.component.html',
  styleUrls: ['./layout-column.component.css']
})
export class LayoutColumnComponent implements OnInit {

  @Input()
  public LayoutContext: any;
  constructor() { }

  ngOnInit() {
  }

}
