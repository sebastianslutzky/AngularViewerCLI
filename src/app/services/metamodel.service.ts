import { Injectable } from '@angular/core';
import { HttpClientWithAuthService } from './http-client-with-auth.service';
import { rootRoute } from '@angular/router/src/router_module';
import "rxjs/add/operator/map" ;
import { Observable } from 'rxjs/Observable';
import { IResource } from '../models/ro/iresource';
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

  private buildUrl(endpoint: string): string{
    return this.rootUrl + '/' + endpoint ;
  }

  public getServicesUrl(): string{
      return this.buildUrl('services');
  }


  public getServices():Observable<IResource>{
    return this.client.get(this.getServicesUrl()).map(res => res.json());
  }

  public getDetails(link: IResource):Observable<IResource>{
    return this.get(this.getDetailsRel(link))
  }

  public getDescribedBy(link: IResource):Observable<IResource>{
    let  describedby =  this.getFromRel(link,"describedby")
    return this.get(describedby)
  }

  public getAction(link: IResource):Observable<IResource>{
    let  rel =  this.getFromRel(link,"urn:org.restfulobjects:rels/action")
    return this.get(rel)
  }

  public get(link: IResourceLink):Observable<any>{
    // console.log('about to load ' + link.href)
    return this.client.get(link.href).map(res=>res.json());
  }
  public getNoMap(link: IResourceLink):Observable<any>{
    // console.log('--about to load ' + link.href)
    return this.client.get(link.href)
  }

  getDetailsRel(resource:IResource):IResourceLink{
    return this.getFromRel(resource,"urn:org.restfulobjects:rels/details")
  }

  public getFromRel(resource: IResource, rel: string): IResourceLink{
    var link: IResourceLink =  resource.links.filter(function(item:any){return item.rel.startsWith(rel)})[0];
    if(!link){
      console.log(resource)
        throw('rel not found: ' + rel)
    }
    return link;
  }
}
