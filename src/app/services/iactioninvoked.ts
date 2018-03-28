import { ActionResult, Resource, ActionDescription, ObjectAction, IIndexable, ResourceLink } from '../models/ro/iresource';
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

    get ParametersInfo(): ParameterInfo[]{
        const keys =  Object.keys(this.ObjectAction.parameters);
        const types = this.ActionDescriptor.parameters;
        const paramType =  keys.map((key, index) =>
         new ParameterInfo(this.ObjectAction.parameters[key], types[index]));

        return paramType;
    }
}

export class ParameterInfo{
 constructor(public instance: any, public typeLink: ResourceLink) {
 }
}

export interface IActionInvoked {
    Arg: ActionInvokedArg;
}
