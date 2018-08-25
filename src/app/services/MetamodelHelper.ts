import { ResourceLink, IResource } from '../models/ro/iresource';

export class MetamodelHelper {

  public static findFromRel(links: ResourceLink[], rel: string): ResourceLink[] {
    return links.filter(function(item: any){return item.rel.startsWith(rel); });
  }

  public static getFromRel(resource: IResource, rel: string): ResourceLink {
    let links: ResourceLink[];
    if (resource.links) {
      links = resource.links;
    } else if ('$$ro' in resource) {
      links = (resource as any).$$ro.links;
    } else {
      throw new Error('can\'t load resource. no links in it');
    }

    const relLink = MetamodelHelper.findFromRel(links, rel);
    if (relLink.length === 0) {
        console.log(resource);
        throw new Error(('rel not found: ' + rel));
    }
    return relLink[0];
  }
}
