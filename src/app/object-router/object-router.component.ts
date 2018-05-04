import { Component, OnInit, Output, EventEmitter, Injector, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MetamodelService } from '../services/metamodel.service';
import { ActionInvokedArg } from '../services/iactioninvoked';
import { ActionInvocationService } from '../services/action-invocation.service';
import { SessionService } from '../services/session.service';
import { Resource, ObjectRepr } from '../models/ro/iresource';
import { MatDialog } from '@angular/material';
import { ObjectComponent } from '../object/object.component';
import {Location} from '@angular/common';
import { LayoutModule } from '@angular/cdk/layout';
import { LayoutService, ObjectLayout } from '../services/layout.service';

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
    private route: Router,
  private layoutService: LayoutService) {
      console.log('at object router constructtor');
     }

  IsBackNavigation: boolean;

  ngOnInit() {
    this._route.paramMap.subscribe(data => {
      // PARSE ACTION
      const destination = data.get('destination');
        const decoded = decodeURIComponent(destination);

      // LOAD RESOURCE (or invoke action)
      this.metamodel.load(ObjectRepr, decoded).subscribe(data1 => {
      const result = data1 ;


      this.session.indexResult(result);

      // todo: load layout 

      this.layoutService.load(result).subscribe(objLayout => {
        this.openModal(result, objLayout);
      });
    });
  });
  }

  openModal(data, layout: ObjectLayout) {
    setTimeout(() => {

       const windowRef =
           this.dialog.open(
             ObjectComponent, {data: {args: data, layout: layout}});
            
          windowRef.updatePosition({top: this.session.DesktopSize.top +  'px', left: '8px'});
          windowRef.updateSize('100vw' , this.session.DesktopSize.height + 'px');
          windowRef.afterClosed().subscribe(result => {
            if (!result || !result.routed)  {
              this.route.navigate(['.']);
            }
           });
     });
 }

}
