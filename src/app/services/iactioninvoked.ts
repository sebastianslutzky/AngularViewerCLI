import { IActionResult, IResource } from '../models/ro/iresource';

export class ActionInvokedArg {
    Result: IActionResult;
    ActionDescriptor: IResource;
}

export interface IActionInvoked {
    Arg: ActionInvokedArg;
}

