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

export class IAction extends Resource {
    parameters: Array<any>;
}

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
