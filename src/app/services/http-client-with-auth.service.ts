import {parseString} from 'xml2js';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import {plainToClass, classToClass, plainToClassFromExist} from 'class-transformer';
declare const X2JS: any;
// TODO: mover urls to a MetamodelClass
@Injectable()
export class HttpClientWithAuthService {

  private x2js: any;
  constructor(private http: Http) {
    this.x2js = new X2JS();
    const xmlText = '<MyRoot><test>Success</test><test2><item>val1</item><item>val2</item></test2></MyRoot>';
    const jsonObj = this.x2js.xml2js( xmlText );
   }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Basic ' +
      btoa('superadmin:pass'));
  }

  addApacheIsisAccept(headers: Headers) {
      headers.append('Accept', 'application/json;profile="urn:org.apache.isis/v1"');
  }

  post(url: string, body: any) {
    const headers = this.buildHeaders(true);
    return this.http.post(url, body, {
      headers: headers
    });
  }

  put(url: string, body: any) {
    return this.http.put(url, body);
  }

  
  buildHeaders(isisHeader: boolean) {
    const headers = new Headers();
          //  console.trace();
    this.createAuthorizationHeader(headers);
    if (isisHeader) {
      this.addApacheIsisAccept(headers);
    }

    return headers;
  }
  get(url: string, isisHeader: boolean = false) {
    const headers = this.buildHeaders(isisHeader);

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

 promisesParser(string) {
  return new Promise(function(resolve, reject)
  {
      parseString(string, function(err, result){
           if (err) {
               reject(err);
           } else {
               resolve(result);
           }
      });
  });
 }
}
