import { IResourceLink } from './iresource-link';

export class Resource {
    value: IResourceListItem[];
    links: IResourceLink[];
    extensions: IResourceExtensions;
    members: IResourceLink[];
    title: string;
}

export class ActionResult {
   links: IResourceLink[];
   result: Resource;
   resulttype: string;
}

export class Action extends Resource {
    parameters: Array<any>;

    get hasParameters(): boolean{
        return this.parameters && this.parameters.length > 0;
    }
}

export class ActionDescription extends Action { }

export interface IResourceExtensions {
    friendlyName: string;
    menuBar: string;
}

////////// new
export class ReprTypesList {
 value: Array<ReprType>;
 links: Array<IResourceLink>;
}

export class ReprType extends IResourceLink {
    title: string;
}

export class IResourceListItem extends IResourceLink {
    title: string;
}
