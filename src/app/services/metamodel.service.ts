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

        this.rootUrl = 'http://' + host + ':' + port + '/' + apiRoot;
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

  public getNoMap(link: IResourceLink): Observable<any> {
    // console.log('--about to load ' + link.href)
    return this.client.get(link.href);
  }

  getDetailsRel(resource: IResource): IResourceLink {
    return this.getFromRel(resource, 'urn:org.restfulobjects:rels/details');
  }

  public getFromRel(resource: IResource, rel: string): IResourceLink {
    const link: IResourceLink =  resource.links.filter(function(item: any){return item.rel.startsWith(rel); })[0];
    if (!link) {
      console.log(resource);
        throw new Error(('rel not found: ' + rel));
    }
    return link;
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
}
