import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MetamodelService } from '../services/metamodel.service';
import { ActionInvokedArg } from '../services/iactioninvoked';
import { ActionInvocationService } from '../services/action-invocation.service';
import { SessionService } from '../services/session.service';
import { Resource } from '../models/ro/iresource';

@Component({
  selector: 'app-object-router',
  templateUrl: './object-router.component.html',
  styleUrls: ['./object-router.component.css']
})

/**
 * RESOURCE LOADING
 * - parse url
 * - load resource
  *  - [todo] check the cache first
  *  - index result (deal with cache too)
*  RENDERING
*    - select view for result and render   describedby
 * 
 */
export class ObjectRouterComponent implements OnInit {

  constructor(private _route: ActivatedRoute,
    private metamodel: MetamodelService,
    private invoker: ActionInvocationService,
    private session: SessionService) {
    console.log('at object router constructtor');
   }

  ngOnInit() {
    this._route.paramMap.subscribe(data => {
      // PARSE ACTION
      const destination = data.get('destination');
      const decoded = decodeURIComponent(destination);

      console.log('at object router onInit, new params');
      console.log(decoded);

      // LOAD RESOURCE (or invoke action)
      this.metamodel.load(Resource, decoded).subscribe(data1 => {
      const result = data1  as Resource;

      this.session.indexResult(result);

      // this.invoker.actionInvoked.emit(result);
    });
      // arg.ActionDescriptor = actionDescriptor;


  });
    // load url
    // create list as popup
  }

}
