export interface IResource {
 links: ResourceLink[];
}

export class Resource {
    value: ResourceListItem[];
    links: ResourceLink[];
    extensions: IResourceExtensions;
    members: ResourceLink[];
    title: string;
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

export class ActionDescription {
    id: string;
    memberType: string;
    links: ResourceLink[];
    parameters: ResourceLink[];
    extensions: IResourceExtensions;

    get hasParameters(): boolean{
        return this.parameters && this.parameters.length > 0;
    }
}

export class ObjectAction {
   id: string;
    memberType: string;
    links: ResourceLink[];
    extensions: IResourceExtensions;
    parameters: any;

}
