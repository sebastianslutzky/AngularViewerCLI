import { ActionResult, Resource, ActionDescription } from '../models/ro/iresource';
import { ViewRef } from '@angular/core/src/linker/view_ref';
import { ViewContainerRef } from '@angular/core/src/linker/view_container_ref';

export class ActionInvokedArg {
    Result: ActionResult;
    ExtendedResult: Array<any>;
    ActionDescriptor: ActionDescription;
}

export class ActionParametersNeededArgs {
    ActionDescriptor: ActionDescription;
    Canvas: ViewContainerRef;
}


export interface IActionInvoked {
    Arg: ActionInvokedArg;
}
