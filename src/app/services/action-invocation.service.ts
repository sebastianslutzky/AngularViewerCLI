import { Injectable, Output, EventEmitter } from '@angular/core';
import { MetamodelService } from './metamodel.service';
import { IActionInvoked, ActionInvokedArg } from './iactioninvoked';
import { Resource, ActionResult, Action, ActionDescription} from '../models/ro/iresource';
import { IResourceLink } from '../models/ro/iresource-link';

@Injectable()
export class ActionInvocationService {
  @Output()
  actionInvoked: EventEmitter<ActionInvokedArg> = new EventEmitter<ActionInvokedArg>();
  @Output()
  actionParamsNeeded: EventEmitter<ActionInvokedArg> = new EventEmitter<ActionInvokedArg>();

  constructor(private metamodel: MetamodelService) { }

    // TODO: it will need to receive the full resource (including describedBy link, to get params)
    public invokeAction(action: Action, actionDescriptor: ActionDescription): void {
      // Action invocation (will need to be a safe call, with proper error handling)
      this.metamodel.getInvoke(action).subscribe(data => {
          const result = data as Array<any>;
          const arg = new ActionInvokedArg();
          arg.ExtendedResult = result;
          arg.ActionDescriptor = actionDescriptor;

         if (arg.ActionDescriptor.hasParameters) {
            // emit event with args;
            const params = arg.ActionDescriptor.parameters;
            console.log('------ params -------');
            console.log(params);
            return;
          }

          this.actionInvoked.emit(arg);
       });
    }

}
