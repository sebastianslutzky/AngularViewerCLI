import { ActionResult, Resource } from '../models/ro/iresource';

export class ActionInvokedArg {
    Result: ActionResult;
    ExtendedResult: Array<any>;
    ActionDescriptor: Resource;
}

export interface IActionInvoked {
    Arg: ActionInvokedArg;
}

