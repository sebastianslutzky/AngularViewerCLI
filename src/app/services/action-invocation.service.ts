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
  validationErrorOccured: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  actionParamsNeeded: EventEmitter<ActionParametersNeededArgs> = new EventEmitter<ActionParametersNeededArgs>();


  constructor(private metamodel: MetamodelService) { }

    // TODO: it will need to receive the full resource (including describedBy link, to get params)
    public invokeAction(action: ObjectAction,
        actionDescriptor: ActionDescription,
        canvas: ViewContainerRef = null,
        params: ActionParameterCollection = null): Promise<any> {
         if (actionDescriptor.hasParameters) {
             if (params) {
                return this.doInvokeAction(action, actionDescriptor, params);
             }
            const args = new ActionParametersNeededArgs();
            args.ActionDescriptor = actionDescriptor;
            args.ObjectAction = action;
            args.Canvas = canvas;

            this.actionParamsNeeded.emit(args);
            return new  Promise<any>(null);
          }

          return this.doInvokeAction(action, actionDescriptor);
    }

    private doInvokeAction(action: ObjectAction,
        actionDescriptor: ActionDescription,
        param: ActionParameterCollection = null): Promise<any> {

         const invoke = this.metamodel.getInvokeLink(action);
         switch (invoke.method) {
             case 'GET':
                const queryString = param ? param.asQueryString() : null;
                return this.metamodel.invokeGet(action, queryString).then(data => {
                    const result = data as Array<any>;
                    const arg = new ActionInvokedArg();
                    arg.ExtendedResult = result;
                    arg.ActionDescriptor = actionDescriptor;

                    this.actionInvoked.emit(arg);
                });
            case 'POST':
            case 'PUT':
                const body = param ? param.asJsonBody() : null;
                return this.metamodel.invokeWithBody(action, body).then(data => {
                    const result = data as Array<any>;
                    const arg = new ActionInvokedArg();
                    arg.ExtendedResult = result;
                    arg.ActionDescriptor = actionDescriptor;

                    this.actionInvoked.emit(arg);
                    return data;
                });
        }
    }
}
