import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClientWithAuthService } from './http-client-with-auth.service';
import { rootRoute } from '@angular/router/src/router_module';
import 'rxjs/add/operator/map' ;
import { Observable } from 'rxjs/Observable';
import { Resource, ActionResult, ReprTypesList, ActionDescription, IResource, ResourceLink, ObjectAction, ObjectMember, ObjectRepr } from '../models/ro/iresource';
import { ResourceFactoryService } from './resource-factory.service';
import { environment } from '../../environments/environment';
import {plainToClass, classToClass, plainToClassFromExist} from 'class-transformer';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from './session.service';
import { MetamodelHelper } from './MetamodelHelper';
import { IStorageSpec } from './object-store.service';
import { GlobalErrorHandlerService } from '../global-error-handler.service';
import { ObjectRouterComponent } from '../object-router/object-router.component';


@Injectable()
export class MetamodelService {
private rootUrl: string;

  constructor(private client: HttpClientWithAuthService,
  private resourceFactory: ResourceFactoryService,
  private router: Router,
  private session: SessionService,
  private activator: ActivatedRoute,
private errorHandler: ErrorHandler) {
        const apiRoot = 'restful';
        const protocol = 'http';

        this.rootUrl = environment.resftulObjectsApiUrl + '/' + apiRoot;
   }
  public assertApiIsAvailable(): Promise<any> {
    const errorSvc = this.errorHandler;
    return this.getUrl(this.rootUrl + '/')
       .catch((reason) => {
         console.log(reason);
         errorSvc.handleError('Restful Objects API unavailable. URL:  ' + this.rootUrl);
         return Promise.reject('Restful Objects API unavailable');
       });
  }

   public getRelativePath(absolutePath: string) {
     return absolutePath.replace(this.rootUrl, '');
   }


  public buildUrl(endpoint: string): string {
    return this.rootUrl + '/' + endpoint ;
  }


  // Known rels
  public async getDetails<T>(link: IResource, store: IStorageSpec = null, usesIsisHeaders: boolean = false): Promise<T> {
    const target = this.getDetailsRel(link);
    return this.loadstored<T>(null, target.href, usesIsisHeaders, null, target.method, store);
  }

  public async getDescribedBy<T>(c: new() => T, link: IResource): Promise<T> {
    const  describedby =  MetamodelHelper.getFromRel(link, 'describedby');
    return this.loadLink(c , describedby);
  }

  public async getActionDescriptor(link: IResource): Promise<ActionDescription> {
     const  describedby =  MetamodelHelper.getFromRel(link, 'describedby');
     const cached = await this.session.getDomainType(describedby);
     if (cached) {
       if (environment.trace.cacheHits) {
        console.log('hit the cache: ' + describedby.href);


       }
      return cached;
     }
       if (environment.trace.cacheMisses) {
        console.log('missed the cache: ' + describedby.href);
       }

       return this.getDescribedBy(ActionDescription, link).then(p => {
        // index after loading
         this.session.indexActionDescriptor(p);
         return p;
      });
  }

  public loadReturnType<T>(c: new() => T, link: IResource): Promise<T> {
    const  resourceLink =  MetamodelHelper.getFromRel(link, 'urn:org.restfulobjects:rels/return-type');
    this.session.getDomainType(resourceLink);

    return this.loadLink(c , resourceLink);
  }
  //

  // tslint:disable-next-line:one-line
  public async getAction(link: IResource): Promise<Observable<Resource>> {
    const rel =  MetamodelHelper.getFromRel(link, 'urn:org.restfulobjects:rels/action');
    return this.get(rel);
  }

  public get(link: ResourceLink, isisHeader: boolean = false): Promise<any> {
    return this.getUrl(link.href, isisHeader);
  }

  public getUrl(url: string, isisHeader: boolean = false): Promise<any> {
    return this.load(null, url, isisHeader);
  }

  getDetailsRel(resource: IResource): ResourceLink {
    return MetamodelHelper.getFromRel(resource, 'urn:org.restfulobjects:rels/details');
  }

  public getReturnType(resource: IResource): ResourceLink {
    return MetamodelHelper.getFromRel(resource, 'urn:org.restfulobjects:rels/return-type');
  }
  getSelf(resource: IResource): ResourceLink {
    return MetamodelHelper.getFromRel(resource, 'self');
  }

   public async invokeGet(resource: IResource, queryString: string = null): Promise<any> {
     return this.loadLink(null, this.getInvokeLink(resource), true, queryString);
   }

   public async invokeWithBody(resource: IResource, body: string): Promise<any> {
     return this.loadLink(null, this.getInvokeLink(resource), true, body) ;
   }

   public getInvokeLink(resource: IResource) {
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

   public routeToObjectFromLink(resource: ResourceLink) {
     this.router.navigate(['object', encodeURIComponent(resource.href)]);
   }


   // Object Type
   public async getProperty(links: ResourceLink[], propertyName: string): Promise<Observable<any>> {
     const properties = MetamodelHelper.findFromRel(links, 'urn:org.restfulobjects:rels/property');
     const matches = properties.filter(function(item: ResourceLink){return item.href.endsWith('properties/' + propertyName); });
     if (matches.length === 0) {
      throw new Error('property not found: ' + propertyName);
     }
     return this.get(matches[0]);
   }

     // tslint:disable-next-line:one-line
   getPropertyType(propertyDescriptor: Resource): string {
    const typeDescr = MetamodelHelper.findFromRel(propertyDescriptor.links, 'urn:org.restfulobjects:rels/return-type');
    // HACK:
    // TODO: follow link and get type from there
    return  typeDescr[0].href.replace('http://localhost:8080/restful/domain-types/', '');
   }

   getObjectMembers(object: ObjectRepr): ObjectMember[] {
    return Object.keys(object.members)
      .map((m) => {
        return object.members[m];
      } );
   }

   getObjectMemberType(member: ObjectMember) {
     // get type
     //

   }

   //////////
   // v2
   // todo: use right method based on http vern
  async load<T>(c: new() => T, url: string, useIsisHeader: boolean = false,
    args: string = null, method: string = 'GET'): Promise<T> {
     switch (method) {
       case 'GET':
            if (args != null) {
              url += '?' + args;
            }

            const result =  this.client.get(url, useIsisHeader)
              //  .map(res => res['as_of_date'] = ) // add timestamp as field
              .map(res => {
                const f = res.headers.get('Date') ;
                return res;
              })
              .map(res => res.json())
              .map(obj => this.toClass(c, obj)).toPromise();

            return result;

       case 'POST':
              return this.client.post(url, args).map(obj => this.toClass(c, obj)).toPromise();
       case 'PUT':
              return this.client.put(url, args).map(obj => this.toClass(c, obj)).toPromise();
       default:
              return this.client. post(url, args).map(obj => this.toClass(c, obj)).toPromise();
     }
   }

   async loadstored<T>(c: new() => T, url: string, useIsisHeader: boolean = false,
        args: string = null, method: string = 'GET', store: IStorageSpec): Promise<T> {

      if (store) {
        const cached = await this.session.getFromStore(store, url);
        if (cached) {
          if (environment.trace.cacheHits) {
          console.log(`Cache hit. Store: ${store.name}. Key: ${url}`);
          }
          return cached;
        }

        if (environment.trace.cacheMisses) {
          console.log(`Cache miss. Store: ${store.name}. Key: ${url}`);
        }
    }

      // load and index
      const loaded =   this.load<T>(null, url, useIsisHeader, args, method).then(x => {
         if (store) {this.session.indexInStore(store.name, x,  url); }
         return x;
      });

      return loaded;
   }

   loadLink<T>(c: new() => T, link: ResourceLink, useIsisHeader: boolean = false, queryString: string = null): Promise<T> {
    return this.load<T>(c, link.href, useIsisHeader, queryString, link.method);
   }

   /////////
   toClass<T>(c: new() => T = null, plain: any): T {
     if (!c) {
       return plain;
     }
    return plainToClassFromExist(new c(), plain);
  }
}

