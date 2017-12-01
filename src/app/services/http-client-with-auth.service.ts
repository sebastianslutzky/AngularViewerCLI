import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';

// TODO: mover urls to a MetamodelClass
@Injectable()
export class HttpClientWithAuthService {
  constructor(private http: Http) { }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Basic ' +
      btoa('superadmin:pass'));
  }

  addApacheIsisAccept(headers: Headers) {
      headers.append('Accept', 'application/json;profile="urn:org.apache.isis/v1"');
  }

  get(url: string, isisHeader: boolean = false) {
    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    if (isisHeader) {
      this.addApacheIsisAccept(headers);
    }
    if (environment.outputHttpCalls) {
     console.log('url: ' + url) ;
     console.log('method: GET') ;
     console.log('headers: ' + headers) ;
    }
    return this.http.get(url, {
      headers: headers
    });
  }
}
