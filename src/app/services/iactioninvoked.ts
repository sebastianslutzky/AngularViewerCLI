import { IActionResult, IResource } from '../models/ro/iresource';

export class ActionInvokedArg {
    Result: IActionResult;
    ExtendedResult: Array<any>;
    ActionDescriptor: IResource;
}

export interface IActionInvoked {
    Arg: ActionInvokedArg;
}

