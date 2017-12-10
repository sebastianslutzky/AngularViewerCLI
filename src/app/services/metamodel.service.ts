import { Injectable } from '@angular/core';
import { HttpClientWithAuthService } from './http-client-with-auth.service';
import { rootRoute } from '@angular/router/src/router_module';
import 'rxjs/add/operator/map' ;
import { Observable } from 'rxjs/Observable';
import { Resource, ActionResult, ReprTypesList, ActionDescription, IResource, ResourceLink } from '../models/ro/iresource';
import { ResourceFactoryService } from './resource-factory.service';
import {plainToClass, classToClass, plainToClassFromExist} from 'class-transformer';
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


  // Known rels
  public getDetails<T>(link: Resource): Observable<T> {
    return this.get(this.getDetailsRel(link));
  }

  public getDescribedBy<T>(c: new() => T, link: IResource): Observable<T> {
    const  describedby =  this.getFromRel(link, 'describedby');
    return this.loadLink(c , describedby);
  }

  public loadReturnType<T>(c: new() => T, link: IResource): Observable<T> {
    const  resourceLink =  this.getFromRel(link, 'urn:org.restfulobjects:rels/return-type');
    return this.loadLink(c , resourceLink);
  }
  //

  // tslint:disable-next-line:one-line
  public getAction(link: Resource): Observable<Resource>{
    const rel =  this.getFromRel(link, 'urn:org.restfulobjects:rels/action');
    return this.get(rel);
  }

  public get(link: ResourceLink, isisHeader: boolean = false): Observable<any> {
    return this.getUrl(link.href, isisHeader);
  }

  public getUrl(url: string, isisHeader: boolean = false): Observable<any> {
    return this.load(null, url, isisHeader);
  }

  getDetailsRel(resource: IResource): ResourceLink {
    return this.getFromRel(resource, 'urn:org.restfulobjects:rels/details');
  }

  public getFromRel(resource: IResource, rel: string): ResourceLink {
    const links = this.findFromRel(resource.links, rel);
    if (links.length === 0) {
        console.log(resource);
        throw new Error(('rel not found: ' + rel));
    }
    return links[0];
  }

  public findFromRel(links: ResourceLink[], rel: string): ResourceLink[] {
    return links.filter(function(item: any){return item.rel.startsWith(rel); });
  }

   public getInvoke(resource: IResource, queryString: string = null): Observable<any> {
     const href = this.getFromRel(resource, 'urn:org.restfulobjects:rels/invoke');
     return this.loadLink(null, href, true,queryString);
   }


   // Object Type
   public getProperty(links: ResourceLink[], propertyName: string): Observable<any> {
     const properties = this.findFromRel(links, 'urn:org.restfulobjects:rels/property');
     const matches = properties.filter(function(item: ResourceLink){return item.href.endsWith('properties/' + propertyName); });
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
   load<T>(c: new() => T, url: string, useIsisHeader: boolean = false, queryString: string = null): Observable<T> {
     if (queryString) {
       url += '?' + queryString;
     }
    return this.client.get(url, useIsisHeader).map(res => res.json()).map(obj => this.toClass(c, obj));
   }

   loadLink<T>(c: new() => T, link: ResourceLink, useIsisHeader: boolean = false, queryString: string = null): Observable<T> {
    return this.load<T>(c, link.href, useIsisHeader, queryString);
   }

   /////////
   toClass<T>(c: new() => T = null, plain: any): T {
     if (!c) {
       return plain;
     }
    return plainToClassFromExist(new c(), plain);
  }
}

