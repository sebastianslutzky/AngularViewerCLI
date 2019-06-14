import { ActionResult, Resource, ActionDescription, ObjectAction, IIndexable, ResourceLink } from '../models/ro/iresource';
import { ViewRef } from '@angular/core/src/linker/view_ref';
import { ViewContainerRef } from '@angular/core/src/linker/view_container_ref';
import { Output } from '@angular/core';

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
    // Canvas: ViewContainerRef;

    private _parameterInfo: ParameterInfo[];

    @Output()
    public get ParameterInfo(): ParameterInfo[]{
        return this._parameterInfo;
    }

    public constructor(public ObjectAction: ObjectAction, public ActionDescriptor: ActionDescription) {
        this._parameterInfo = this.retrieveParametersInfo();
    }

    retrieveParametersInfo(): ParameterInfo[] {
        const keys =  Object.keys(this.ObjectAction.parameters);
        const types = this.ActionDescriptor.parameters;
        const paramType =  keys.map((key, index) =>
         new ParameterInfo(this.ObjectAction.parameters[key], types[index]));

        return paramType;
    }
}

export class ParameterInfo {
 constructor(public instance: any, public typeLink: ResourceLink) {
 }
}

export interface IActionInvoked {
    Arg: ActionInvokedArg;
}
