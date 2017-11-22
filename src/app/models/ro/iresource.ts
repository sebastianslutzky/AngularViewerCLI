import { IResourceListItem } from './iresource-list-item';
import { IResourceLink } from './iresource-link';

export interface IResource {
    value: IResourceListItem[];
    links: IResourceLink[];
    extensions: IResourceExtensions;
    members: IResource[];
    title: string;
}

export interface IActionResult {
   links: IResourceLink[];
   result: IResource;
   resulttype: string;
}

export interface IAction extends IResource {
    parameters: Array<any>;
}

export interface IResourceExtensions {
    friendlyName: string;
    menuBar: string;
}
