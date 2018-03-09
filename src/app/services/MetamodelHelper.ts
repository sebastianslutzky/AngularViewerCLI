import { ResourceLink, IResource } from '../models/ro/iresource';

export class MetamodelHelper {

  public static findFromRel(links: ResourceLink[], rel: string): ResourceLink[] {
    return links.filter(function(item: any){return item.rel.startsWith(rel); });
  }

  public static getFromRel(resource: IResource, rel: string): ResourceLink {
    const links = MetamodelHelper.findFromRel(resource.links, rel);
    if (links.length === 0) {
        console.log(resource);
        throw new Error(('rel not found: ' + rel));
    }
    return links[0];
  }
}
