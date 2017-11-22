import { IActionResult } from '../models/ro/iresource';

export class ActionInvokedArg {
    Result: IActionResult;
}

export interface IActionInvoked {
    Arg: ActionInvokedArg;
}

