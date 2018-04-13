import { Component, OnInit, Output, EventEmitter, Injector } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MetamodelService } from '../services/metamodel.service';
import { ActionInvokedArg } from '../services/iactioninvoked';
import { ActionInvocationService } from '../services/action-invocation.service';
import { SessionService } from '../services/session.service';
import { Resource, ObjectRepr } from '../models/ro/iresource';
import { MatDialog } from '@angular/material';
import { ObjectComponent } from '../object/object.component';
import {Location} from '@angular/common';

@Component({
  selector: 'app-object-router',
  templateUrl: './object-router.component.html',
  styleUrls: ['./object-router.component.css']
})

export class ObjectRouterComponent implements OnInit {

  constructor(private _route: ActivatedRoute,
    private metamodel: MetamodelService,
    private invoker: ActionInvocationService,
    private dialog: MatDialog,
    private injector: Injector,
    private session: SessionService,
    private location: Location,
  private route: Router) {
    console.log('at object router constructtor');
   }

  IsBackNavigation: boolean;

  ngOnInit() {
    this._route.paramMap.subscribe(data => {
      // PARSE ACTION
      const destination = data.get('destination')
      const decoded = decodeURIComponent(destination);

      // LOAD RESOURCE (or invoke action)
      this.metamodel.load(ObjectRepr, decoded).subscribe(data1 => {
      const result = data1 ;

      this.session.indexResult(result);
      this.openModal(result);
    });
  });
  }

  openModal(data) {
    setTimeout(() => {

       const windowRef =
           this.dialog.open(
             ObjectComponent, {data: {args: data}});
            
          windowRef.updatePosition({top:'1px',left:'1px'})
          windowRef.updateSize( '200px', '300px');

           windowRef.afterClosed().subscribe(result => {
            if (!result || !result.routed)  {
              this.route.navigate(['.']);
            }
           });
     });
 }

}
