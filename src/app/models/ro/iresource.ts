import { error } from 'util';
import { MetamodelService} from '../../services/metamodel.service';
import { MetamodelHelper } from '../../services/MetamodelHelper';

export interface IResource {
 links: ResourceLink[];
}

export interface IIndexable {
    indexableKey: string;
}

export class Resource implements IIndexable {
    get id(): string{
       return this.getSelf(this.links).href ;
    }

    get indexableKey(): string{
        return this.id;
    }
    value: ResourceListItem[];
    links: ResourceLink[];
    extensions: IResourceExtensions;
    members: ResourceLink[];
    title: string;

    // todo: deduplicate this method (copied from metamodelservice)
    // extract to some libr
  public getSelf(links: ResourceLink[]): ResourceLink {
    const self = links.filter(function(item: any){return item.rel.startsWith('self'); });
    if (self.length === 0) {
        throw new Error('self link not found for action');
    }
    return self[0];
  }
}

export class ActionResult {
    get id(): string{
        throw new Error('not implemented');
    }
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
export class ResourceLink   {
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
    default: string;
    name: string;
    number: number;
    maxLength: number;
    optional: boolean;
    extensions: IResourceExtensions;
    parameters: any;
}

export class DomainType implements IIndexable {
    links: ResourceLink[];
    canonicalName: string;

    get indexableKey(): string{
        return this.canonicalName;
    }
}

// action type
export class ActionDescription implements IIndexable, IResource {
    id: string;

    get indexableKey(): string{
        return MetamodelHelper.getFromRel(this, 'self').href;
    }

    get returnType(): string{
        return MetamodelHelper.getFromRel(this, 'return-type').href;
    }

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

export class PropertyDescription implements IIndexable, IResource {
    id: string;

    // Property specific
    optional: boolean;
    maxLength: number;

    get indexableKey(): string{
        return MetamodelHelper.getFromRel(this, 'self').href;
    }
    memberType: string;
    links: ResourceLink[];
    extensions: IResourceExtensions;

    get friendlyName(): string{
        return this.extensions.friendlyName;
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

export class ObjectRepr implements IIndexable {

    get indexableKey(): string{
        return MetamodelHelper.getFromRel(this, 'self').href;
    }
    links: ResourceLink[];
    extension: IResourceExtensions;
    title: string;
    domainType: string;
    instanceId: string;
    members: ObjectMember[];
}

export interface ObjectMember extends IIndexable {
    id: string;

    memberType: string; // todo: cast into enumeration
    links: ResourceLink[];
    value: any;
    extensions: any;
    disabledReason: string;
}
