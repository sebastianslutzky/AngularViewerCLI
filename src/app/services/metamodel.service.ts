import { Injectable } from '@angular/core';
import { HttpClientWithAuthService } from './http-client-with-auth.service';
import { rootRoute } from '@angular/router/src/router_module';
import 'rxjs/add/operator/map' ;
import { Observable } from 'rxjs/Observable';
import { IResource, IActionResult } from '../models/ro/iresource';
import { IResourceLink } from '../models/ro/iresource-link';

@Injectable()
export class MetamodelService {

  private rootUrl: string;

  constructor(private client: HttpClientWithAuthService) {
        const host = 'localhost';
        const port = '8080';
        const apiRoot = 'restful';
        const protocol = 'http';

        this.rootUrl = protocol  + '://' + host + ':' + port + '/' + apiRoot;
   }

  private buildUrl(endpoint: string): string {
    return this.rootUrl + '/' + endpoint ;
  }

  public getServicesUrl(): string {
      return this.buildUrl('services');
  }

  public getServices(): Observable<IResource> {
    return this.client.get(this.getServicesUrl()).map(res => res.json());
  }

  public getDetails(link: IResource): Observable<IResource> {
    return this.get(this.getDetailsRel(link));
  }

  public getDescribedBy(link: IResource): Observable<IResource> {
    const  describedby =  this.getFromRel(link, 'describedby');
    return this.get(describedby);
  }

  // tslint:disable-next-line:one-line
  public getAction(link: IResource): Observable<IResource>{
    const rel =  this.getFromRel(link, 'urn:org.restfulobjects:rels/action');
    return this.get(rel);
  }

  public get(link: IResourceLink, isisHeader: boolean = false): Observable<any> {
    return this.getUrl(link.href, isisHeader);
  }

  public getUrl(url: string, isisHeader: boolean = false): Observable<any> {
    return this.client.get(url, isisHeader).map(res => res.json());
  }

  getDetailsRel(resource: IResource): IResourceLink {
    return this.getFromRel(resource, 'urn:org.restfulobjects:rels/details');
  }

  public getFromRel(resource: IResource, rel: string): IResourceLink {
    const links = this.findFromRel(resource.links, rel);
    if (links.length === 0) {
        throw new Error(('rel not found: ' + rel));
    }
    return links[0];
  }

  public findFromRel(links: IResourceLink[], rel: string): IResourceLink[] {
    return links.filter(function(item: any){return item.rel.startsWith(rel); });
  }

  // todo: find user service from home page (with rels)http://localhost:8080/restful/user
    public getMeInvocation(): string {
      return  this.buildUrl('services/isissecurity.MeService/actions/me/invoke');
   }

   public getInvoke(resource: IResource): Observable<any> {
     const href = this.getFromRel(resource, 'urn:org.restfulobjects:rels/invoke');
     return this.get(href, true);
   }

   public getMe(): Observable<IActionResult> {
    return this.getUrl(this.getMeInvocation());
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

   getPropertyType(name: string, propertyDescriptor: IResource): string {
    const typeDescr = this.findFromRel(propertyDescriptor.links, 'urn:org.restfulobjects:rels/return-type');
    // HACK:
    // TODO: follow link and get type from there
    return  typeDescr[0].href.replace('http://localhost:8080/restful/domain-types/', '');
   }
}
