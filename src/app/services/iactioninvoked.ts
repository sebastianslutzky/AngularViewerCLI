import { ActionResult, Resource, ActionDescription, ObjectAction, IIndexable } from '../models/ro/iresource';
import { ViewRef } from '@angular/core/src/linker/view_ref';
import { ViewContainerRef } from '@angular/core/src/linker/view_container_ref';

export class ActionInvokedArg implements IIndexable {
    get indexableKey(): string{
        return this.ActionDescriptor.indexableKey;
    }
    get shortName(): string{
        return this.ActionDescriptor.friendlyName;
    }
    Result: ActionResult;
    ExtendedResult: Array<any>;
    ActionDescriptor: ActionDescription;
    Timestamp: Date = new Date();
}

export class ActionParametersNeededArgs {
    ObjectAction: ObjectAction;
    ActionDescriptor: ActionDescription;
    Canvas: ViewContainerRef;
}

export interface IActionInvoked {
    Arg: ActionInvokedArg;
}
