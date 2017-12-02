import { Injectable } from '@angular/core';
import { HttpClientWithAuthService } from './http-client-with-auth.service';
import { rootRoute } from '@angular/router/src/router_module';
import 'rxjs/add/operator/map' ;
import { Observable } from 'rxjs/Observable';
import { Resource, ActionResult, ReprTypesList } from '../models/ro/iresource';
import { IResourceLink } from '../models/ro/iresource-link';
import { ResourceFactoryService } from './resource-factory.service';
 
@Injectable()
export class MetamodelService {

  private rootUrl: string;

  constructor(private client: HttpClientWithAuthService, private resourceFactory: ResourceFactoryService) {
        const host = 'localhost';
        const port = '8080';
        const apiRoot = 'restful';
        const protocol = 'http';

        this.rootUrl = protocol  + '://' + host + ':' + port + '/' + apiRoot;
   }

  public buildUrl(endpoint: string): string {
    return this.rootUrl + '/' + endpoint ;
  }


  public getDetails(link: Resource): Observable<Resource> {
    return this.get(this.getDetailsRel(link));
  }

  public getDescribedBy(link: Resource): Observable<Resource> {
    const  describedby =  this.getFromRel(link, 'describedby');
    return this.get(describedby);
  }

  // tslint:disable-next-line:one-line
  public getAction(link: Resource): Observable<Resource>{
    const rel =  this.getFromRel(link, 'urn:org.restfulobjects:rels/action');
    return this.get(rel);
  }

  public get(link: IResourceLink, isisHeader: boolean = false): Observable<any> {
    return this.getUrl(link.href, isisHeader);
  }

  public getUrl(url: string, isisHeader: boolean = false): Observable<any> {
    return this.load<any>(url, isisHeader);
  }

  getDetailsRel(resource: Resource): IResourceLink {
    return this.getFromRel(resource, 'urn:org.restfulobjects:rels/details');
  }

  public getFromRel(resource: Resource, rel: string): IResourceLink {
    const links = this.findFromRel(resource.links, rel);
    if (links.length === 0) {
        throw new Error(('rel not found: ' + rel));
    }
    return links[0];
  }

  public findFromRel(links: IResourceLink[], rel: string): IResourceLink[] {
    return links.filter(function(item: any){return item.rel.startsWith(rel); });
  }


   public getInvoke(resource: Resource): Observable<any> {
     const href = this.getFromRel(resource, 'urn:org.restfulobjects:rels/invoke');
     return this.get(href, true);
   }


   // Object Type
   public getProperty(links: IResourceLink[], propertyName: string): Observable<any> {
     const properties = this.findFromRel(links, 'urn:org.restfulobjects:rels/property');
     const matches = properties.filter(function(item: IResourceLink){return item.href.endsWith('properties/' + propertyName); });
     if (matches.length === 0) {
      throw new Error('property not found: ' + propertyName);
     }
     return this.get(matches[0]);
   }

   getPropertyType(name: string, propertyDescriptor: Resource): string {
    const typeDescr = this.findFromRel(propertyDescriptor.links, 'urn:org.restfulobjects:rels/return-type');
    // HACK:
    // TODO: follow link and get type from there
    return  typeDescr[0].href.replace('http://localhost:8080/restful/domain-types/', '');
   }

   //////////
   // v2
   // todo: use right method based on http vern
   load<T>(url: string, useIsisHeader: boolean = false): Observable<T> {
    return this.client.get(url, useIsisHeader).map(res => res.json());
   }

   loadLink<T>(link: IResourceLink, useIsisHeader: boolean = false): Observable<T> {
    return this.load<T>(link.href, useIsisHeader);
   }
   /////////
}
