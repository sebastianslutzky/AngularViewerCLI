import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import {plainToClass, classToClass, plainToClassFromExist} from 'class-transformer';
// TODO: mover urls to a MetamodelClass
@Injectable()
export class HttpClientWithAuthService {

  constructor(private http: Http) {
   }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Basic ' +
      btoa('superadmin:pass'));
  }

  addApacheIsisAccept(headers: Headers) {
      headers.append('Accept', 'application/json;profile="urn:org.apache.isis/v1"');
  }


  applyExtendedParameters(extendedParameters: Array<string>, body: string) {
    if (!extendedParameters) {
      return;
    }

    if (extendedParameters.includes('x-ro-validate-only')) {
      const objectBody = JSON.parse(body);
      objectBody['x-ro-validate-only'] = 'true';
      body = JSON.stringify(objectBody);
    }
  }
  post(url: string, body: any, extendedParameters: Array<string> = null) {
    const headers = this.buildHeaders(true, extendedParameters);
    this.applyExtendedParameters(extendedParameters,body);
    return this.http.post(url, body, {
      headers: headers
    });
  }

  put(url: string, body: any, extendedParameters: Array<string> = null) {
    return this.http.put(url, body, {
      headers : this.buildHeaders(false, extendedParameters)
    });
  }
  buildHeaders(isisHeader: boolean, extendedParameters: Array<string>) {
    const headers = new Headers();
          //  console.trace();
    this.createAuthorizationHeader(headers);
    if (isisHeader) {
      this.addApacheIsisAccept(headers);
    }

    return headers;
  }
  get(url: string, isisHeader: boolean = false, extendedParameters: Array<string> = null) {
    const headers = this.buildHeaders(isisHeader,extendedParameters);

    if (environment.trace.httpCalls) {
     console.log('url: ' + url) ;
     console.log('method: GET') ;
     console.log('headers: ' + headers) ;
    }
    return this.http.get(url, {
      headers: headers
    });
  }

// todo: turn this into the only method to use for loading
  load<T>(c: new() => T, url: string, useIsisHeader: boolean = false, args: string = null,
          method: string = 'GET', format: string = 'json'): Observable<T> {
          //  console.trace();
            switch (method) {
      case 'GET':
           if (args != null) {
             url += '?' + args;
           }

           return this.get(url, useIsisHeader)
              .map(res    =>  res.json())
              .map(asJson => plainToClassFromExist(new c(), asJson))

              // if we are dealing with xml, map to json
      case 'POST':
             return this.post(url, args).map(obj => this.toClass(c, obj));
      default:
       throw new Error ('method not implemented yet: ' + method);
    }
  }

  toClass<T>(c: new() => T = null, plain: any): T {
    if (!c) {
      return plain;
    }
   return plainToClassFromExist(new c(), plain);
 }
}
