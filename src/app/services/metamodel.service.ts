import { Injectable } from '@angular/core';
import { HttpClientWithAuthService } from './http-client-with-auth.service';
import { rootRoute } from '@angular/router/src/router_module';
import 'rxjs/add/operator/map' ;
import { Observable } from 'rxjs/Observable';
import { Resource, ActionResult, ReprTypesList, ActionDescription, IResource, ResourceLink, ObjectAction } from '../models/ro/iresource';
import { ResourceFactoryService } from './resource-factory.service';
import { environment } from '../../environments/environment';
import {plainToClass, classToClass, plainToClassFromExist} from 'class-transformer';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from './session.service';
import { MetamodelHelper } from './MetamodelHelper';


@Injectable()
export class MetamodelService {
private rootUrl: string;

  constructor(private client: HttpClientWithAuthService,
    private resourceFactory: ResourceFactoryService,
  private router: Router,

  private session: SessionService,
  private activator: ActivatedRoute ) {
        const apiRoot = 'restful';
        const protocol = 'http';

        this.rootUrl = environment.backendAddress + '/' + apiRoot;
   }

   public getRelativePath(absolutePath: string) {
     return absolutePath.replace(this.rootUrl, '');
   }

  public buildUrl(endpoint: string): string {
    return this.rootUrl + '/' + endpoint ;
  }


  // Known rels
  public getDetails<T>(link: IResource): Observable<T> {
    return this.get(this.getDetailsRel(link));
  }

  public getDescribedBy<T>(c: new() => T, link: IResource): Observable<T> {
    const  describedby =  MetamodelHelper.getFromRel(link, 'describedby');
    return this.loadLink(c , describedby);
  }

  public getActionDescriptor(link: IResource): Observable<ActionDescription> {
     const  describedby =  MetamodelHelper.getFromRel(link, 'describedby');
     if (this.session.containsAction(describedby)) {
       throw new Error('a reusarlo');
     }

     return this.getDescribedBy(ActionDescription, link).map(p => {
       // index after loading
        this.session.indexActionDescriptor(p);
        return p;
     });
  }

  public loadReturnType<T>(c: new() => T, link: IResource): Observable<T> {
    const  resourceLink =  MetamodelHelper.getFromRel(link, 'urn:org.restfulobjects:rels/return-type');
    return this.loadLink(c , resourceLink);
  }
  //

  // tslint:disable-next-line:one-line
  public getAction(link: IResource): Observable<Resource>{
    const rel =  MetamodelHelper.getFromRel(link, 'urn:org.restfulobjects:rels/action');
    return this.get(rel);
  }

  public get(link: ResourceLink, isisHeader: boolean = false): Observable<any> {
    return this.getUrl(link.href, isisHeader);
  }

  public getUrl(url: string, isisHeader: boolean = false): Observable<any> {
    return this.load(null, url, isisHeader);
  }

  getDetailsRel(resource: IResource): ResourceLink {
    return MetamodelHelper.getFromRel(resource, 'urn:org.restfulobjects:rels/details');
  }

  getSelf(resource: IResource): ResourceLink {
    return MetamodelHelper.getFromRel(resource, 'self');
  }

   public invokeGet(resource: IResource, queryString: string = null): Observable<any> {
     return this.loadLink(null, this.getInvokeLink(resource), true, queryString);
   }

   public getInvokeLink(resource:IResource){
     return  MetamodelHelper.getFromRel(resource, 'urn:org.restfulobjects:rels/invoke');
   }

   public routeMenuAction(resource: IResource, queryString: string = null) {
     const href = MetamodelHelper.getFromRel(resource, 'urn:org.restfulobjects:rels/invoke');
     if (queryString == null) {
       queryString = '';
     } else {
       queryString  = '?' + queryString;
     }
     this.router.navigate(['menu', encodeURIComponent(href.href + queryString)]);
   }

   public routeToObject(resource: Resource) {
     const link = this.getSelf(resource);
     this.router.navigate(['object', encodeURIComponent(link.href)]);
   }


   // Object Type
   public getProperty(links: ResourceLink[], propertyName: string): Observable<any> {
     const properties = MetamodelHelper.findFromRel(links, 'urn:org.restfulobjects:rels/property');
     const matches = properties.filter(function(item: ResourceLink){return item.href.endsWith('properties/' + propertyName); });
     if (matches.length === 0) {
      throw new Error('property not found: ' + propertyName);
     }
     return this.get(matches[0]);
   }

     // tslint:disable-next-line:one-line
   getPropertyType(name: string, propertyDescriptor: Resource): string {
    const typeDescr = MetamodelHelper.findFromRel(propertyDescriptor.links, 'urn:org.restfulobjects:rels/return-type');
    // HACK:
    // TODO: follow link and get type from there
    return  typeDescr[0].href.replace('http://localhost:8080/restful/domain-types/', '');
   }

   //////////
   // v2
   // todo: use right method based on http vern
   load<T>(c: new() => T, url: string, useIsisHeader: boolean = false, queryString: string = null,method: string = "GET"): Observable<T> {
     switch(method){
       case 'GET':
            if (queryString != null) {
              url += '?' + queryString;
            }

            return this.client.get(url, useIsisHeader)
              //  .map(res => res['as_of_date'] = ) // add timestamp as field
              .map(res => {
                const f = res.headers.get('Date') ;
                return res;
              })
              .map(res => res.json())
              .map(obj => this.toClass(c, obj));
       case 'POST':
              return this.client.post(url, {}).map(obj => this.toClass(c, obj));
       default:
        throw new Error ('method not implemented yet: ' + method);
     }
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

