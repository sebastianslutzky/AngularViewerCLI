import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MetamodelService } from '../services/metamodel.service';
import { ActionInvokedArg } from '../services/iactioninvoked';
import { ActionInvocationService } from '../services/action-invocation.service';
import { SessionService } from '../services/session.service';

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
*    - select view for result and render   
 * 
 */
export class ObjectRouterComponent implements OnInit {
  @Output()
  constructor(private _route: ActivatedRoute,
    private metamodel: MetamodelService,
    private invoker: ActionInvocationService,
    private session: SessionService) {
    console.log('at object router constructtor');
   }

  ngOnInit() {
    this._route.paramMap.subscribe(data => {
      //PARSE ACTION
      const destination = data.get('destination');
      const decoded = decodeURIComponent(destination);

      console.log('at object router onInit, new params');
      console.log(decoded);

      //LOAD RESOURCE
      this.metamodel.getUrl(decoded, true).subscribe(data1 => {
        const result = data1 as Array<any>;
        const arg = new ActionInvokedArg();
        arg.ExtendedResult = result;

     // GET ACTION DESCRIPTOR
      this.metamodel.getAction

      //INDEX RESOURCE
      this.session.indexResult(arg);

      this.invoker.actionInvoked.emit(arg);


    });
      //arg.ActionDescriptor = actionDescriptor;


  });
    // load url
    // create list as popup
  }

}
