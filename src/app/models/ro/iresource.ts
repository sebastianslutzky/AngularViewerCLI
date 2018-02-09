import { error } from "util";

export interface IResource {
 links: ResourceLink[];
}

export interface IIndexable {
    id: string;
}

export class Resource implements IIndexable {
    get id(): string{

    }
    value: ResourceListItem[];
    links: ResourceLink[];
    extensions: IResourceExtensions;
    members: ResourceLink[];
    title: string;

    // todo: deduplicate this method (copied from metamodelservice)
    // extract to some libr
  public getSelf(links: ResourceLink[], rel: string): ResourceLink {
    const self = links.filter(function(item: any){return item.rel.startsWith('self'); });
    if (self.length === 0) {
        throw new Error('self link not found for action');
    }
  }
}

export class ActionResult {
   links: ResourceLink[];
   result: Resource;
   resulttype: string;
}

export class Action extends Resource {
    parameters: Array<any>;

    get hasParameters(): boolean{
        return this.parameters && this.parameters.length > 0;
    }
}


export interface IResourceExtensions {
    friendlyName: string;
    menuBar: string;
    actionType: string;
    actionSematisc: string;
}

////////// new
export class ReprTypesList {
 value: Array<ReprType>;
 links: Array<ResourceLink>;
}
export class ResourceLink {
    rel: string;
    href: string;
    method: string;
    type: string;
}

export class ResourceListItem extends ResourceLink {
    title: string;
}

// RO Types
export class ReprType extends ResourceLink {
    title: string;
}


export class ParamDescription {
    id: string;
    memberType: string;
    links: ResourceLink[];
    name: string;
    number: number;
    maxLength: number;
    optional: boolean;
    extensions: IResourceExtensions;
    parameters: any;
}

export class DomainType {
    links: ResourceLink[];
    canonicalName: string;
}

// action type
export class ActionDescription {
    id: string;
    memberType: string;
    links: ResourceLink[];
    parameters: ResourceLink[];
    extensions: IResourceExtensions;

    get friendlyName(): string{
        return this.extensions.friendlyName;
    }

    get hasParameters(): boolean{
        return this.parameters && this.parameters.length > 0;
    }
}

// instance of an action
export class ObjectAction {
   id: string;
    memberType: string;
    links: ResourceLink[];
    extensions: IResourceExtensions;
    parameters: any;
}
