import { ActionResult, Resource, ActionDescription } from '../models/ro/iresource';

export class ActionInvokedArg {
    Result: ActionResult;
    ExtendedResult: Array<any>;
    ActionDescriptor: ActionDescription;
}

export interface IActionInvoked {
    Arg: ActionInvokedArg;
}

