import { ActionResult, Resource, ActionDescription, ObjectAction } from '../models/ro/iresource';
import { ViewRef } from '@angular/core/src/linker/view_ref';
import { ViewContainerRef } from '@angular/core/src/linker/view_container_ref';

export class ActionInvokedArg {
    get shortName(): string{
        return this.ActionDescriptor.friendlyName 
    }
    Result: ActionResult;
    ExtendedResult: Array<any>;
    ActionDescriptor: ActionDescription;
}

export class ActionParametersNeededArgs {
    ObjectAction: ObjectAction;
    ActionDescriptor: ActionDescription;
    Canvas: ViewContainerRef;
}


export interface IActionInvoked {
    Arg: ActionInvokedArg;
}
