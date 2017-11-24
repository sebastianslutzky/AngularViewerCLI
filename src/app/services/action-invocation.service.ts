import { Injectable, Output, EventEmitter } from '@angular/core';
import { MetamodelService } from './metamodel.service';
import { IActionInvoked, ActionInvokedArg } from './iactioninvoked';
import { IResource, IActionResult } from '../models/ro/iresource';
import { IResourceLink } from '../models/ro/iresource-link';

@Injectable()
export class ActionInvocationService {
  @Output()
  actionInvoked: EventEmitter<ActionInvokedArg> = new EventEmitter<ActionInvokedArg>();

  constructor(private metamodel: MetamodelService) { }

    // TODO: it will need to receive the full resource (including describedBy link, to get params)
    public invokeAction(actionResource: IResource): void {
      // Action invocation (will need to be a safe call, with proper error handling)
      this.metamodel.getInvoke(actionResource).subscribe(data => {
          const result = data as IActionResult;
          const arg = new ActionInvokedArg();
          arg.Result = result;

          this.actionInvoked.emit(arg);
       });
    }
}
