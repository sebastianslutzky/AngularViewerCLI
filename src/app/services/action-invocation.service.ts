import { Injectable, Output, EventEmitter } from '@angular/core';
import { MetamodelService } from './metamodel.service';
import { IActionInvoked, ActionInvokedArg,  ActionParametersNeededArgs } from './iactioninvoked';
import { Resource, ActionResult, Action, ActionDescription, ObjectAction} from '../models/ro/iresource';
import { ViewRef } from '@angular/core/src/linker/view_ref';
import { ViewContainerRef } from '@angular/core/src/linker/view_container_ref';
import { ActionParameterCollection } from '../dialog/dialog.component';
import { SessionService } from './session.service';

@Injectable()
export class ActionInvocationService {
  @Output()
  actionInvoked: EventEmitter<ActionInvokedArg> = new EventEmitter<ActionInvokedArg>();
  @Output()
  actionParamsNeeded: EventEmitter<ActionParametersNeededArgs> = new EventEmitter<ActionParametersNeededArgs>();


  constructor(private metamodel: MetamodelService) { }

    // TODO: it will need to receive the full resource (including describedBy link, to get params)
    public invokeAction(action: ObjectAction,
        actionDescriptor: ActionDescription,
        canvas: ViewContainerRef = null,
        params: ActionParameterCollection = null): void {
         if (actionDescriptor.hasParameters) {
             if (params) {
                this.doInvokeAction(action, actionDescriptor, params);
                return;
             }
            const args = new ActionParametersNeededArgs();
            args.ActionDescriptor = actionDescriptor;
            args.ObjectAction = action;
            args.Canvas = canvas;

            this.actionParamsNeeded.emit(args);
            return;
          }

          this.doInvokeAction(action, actionDescriptor);
    }

    private doInvokeAction(action: ObjectAction, actionDescriptor: ActionDescription, param: ActionParameterCollection = null) {
        // Action invocation (will need to be a safe call, with proper error handling)
        
        const queryString = param ? param.asQueryString() : null;
        this.metamodel.routeToGet(action, queryString) ;
        return;

        // this.metamodel.getInvoke(action, queryString).subscribe(data => {
        //     const result = data as Array<any>;
        //     const arg = new ActionInvokedArg();
        //     arg.ExtendedResult = result;
        //     arg.ActionDescriptor = actionDescriptor;

        //     this.actionInvoked.emit(arg);
        // });
    }

}
