import { Injectable, Output, EventEmitter } from '@angular/core';
import { MetamodelService } from './metamodel.service';
import { IActionInvoked, ActionInvokedArg,  ActionParametersNeededArgs } from './iactioninvoked';
import { Resource, ActionResult, Action, ActionDescription, ObjectAction} from '../models/ro/iresource';
import { ViewRef } from '@angular/core/src/linker/view_ref';
import { ViewContainerRef } from '@angular/core/src/linker/view_container_ref';
import { ActionParameterCollection } from '../dialog/dialog.component';

@Injectable()
export class ActionInvocationService {
  @Output()
  collectionActionInvoked: EventEmitter<ActionInvokedArg> = new EventEmitter<ActionInvokedArg>();

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
        params: ActionParameterCollection = null,
        extendedParameters: Array<string> = []): Promise<any> {
         if (actionDescriptor.hasParameters) {
             if (params) {
                return this.doInvokeAction(action, actionDescriptor, params, extendedParameters);
             }
            const args = new ActionParametersNeededArgs(action,actionDescriptor);

            this.actionParamsNeeded.emit(args);
            return new  Promise<any>(null);
          }

          return this.doInvokeAction(action, actionDescriptor);
    }

    public validateAction(action: ObjectAction,
        actionDescriptor: ActionDescription,
        canvas: ViewContainerRef = null,
        params: ActionParameterCollection = null): Promise<any> {
            return this.invokeAction(action, actionDescriptor, canvas, params, ['x-ro-validate-only']);
            // .then(x =>
            //     { 
            //     console.log('right here');
            //     console.log(x);
            //     return x; });
    }

    private doInvokeAction(action: ObjectAction,
        actionDescriptor: ActionDescription,
        param: ActionParameterCollection = null,
        extendedParameters: Array<string> = []): Promise<any> {


         const invoke = this.metamodel.getInvokeLink(action);
         switch (invoke.method) {
             case 'GET':
                const queryString = param ? param.asQueryString() : null;
                return this.metamodel.invokeGet(action, queryString,extendedParameters).then(data => {
                    const result = data as Array<any>;
                    const arg = new ActionInvokedArg();
                    arg.ExtendedResult = result;
                    arg.ActionDescriptor = actionDescriptor;

                    return this.onActionInvoked(arg);
                });
            case 'POST':
            case 'PUT':
                const body = param ? param.asJsonBody() : null;
                return this.metamodel.invokeWithBody(action, body, extendedParameters).then(data => {
                    const result = data as Array<any>;
                    const arg = new ActionInvokedArg();
                    arg.ExtendedResult = result;
                    arg.ActionDescriptor = actionDescriptor;

                    if (!this.isValidation(extendedParameters)) {
                         this.onActionInvoked(arg);
                    }

                    return Promise.resolve(data);
                });
        }
    }

    private onActionInvoked(args: ActionInvokedArg) : Promise<any> {
         this.actionInvoked.emit(args);
         return Promise.resolve<string>('dfs');
    }

    private isValidation(extendedParameters: string[]): boolean {
        return extendedParameters.some(x => x === 'x-ro-validate-only');
    }
}
