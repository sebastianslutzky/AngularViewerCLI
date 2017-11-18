import { IResourceListItem } from './iresource-list-item';
import { IResourceLink } from './iresource-link';

export interface IResource {
    value: IResourceListItem[];
    links: IResourceLink[];
    extensions: IResourceExtensions;
}


export interface IResourceExtensions{
    friendlyName: string
}
