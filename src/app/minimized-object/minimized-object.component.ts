import { Component, OnInit, Input } from '@angular/core';
import { MetamodelService } from '../services/metamodel.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-minimized-object',
  templateUrl: './minimized-object.component.html',
  styleUrls: ['./minimized-object.component.css']
})
export class MinimizedObjectComponent implements OnInit {

  private _context: any;
  Title: string;

  @Input()
  set Context(val: any){
    this._context = val;
    this.Title = this.getFriendlyName(val);
  }
  constructor(private metamodel: MetamodelService, private router: Router) { }

  ngOnInit() {
  }

  maximize() {
    this.metamodel.routeToObject(this._context);
  }

  getFriendlyName(result): string {

    // if displayng the result of an action (lists)
    if (result.ActionDescriptor) {
      return result.ActionDescriptor.friendlyName;
    }

    // if displaying an object (it should be the only valid case)
    if (result.title) {
      return result.title;
    }

    return 'unknown';
  }

}
