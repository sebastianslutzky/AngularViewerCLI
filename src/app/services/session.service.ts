import { Injectable } from '@angular/core';
import { IdentityMap } from '../models/identity-map';

@Injectable()
export class SessionService {
  public currentResults: any[] = [];
  public shelvedResults: any[] = [];
  private registry: IdentityMap;

  constructor() {
    this.registry = new IdentityMap();
  }

  indexCurrentResult(result: any): any {
   this.addToIdentityMap(result);
   this.addToCurrentResults(result);
  }

  private addToCurrentResults(result: any) {
    this.currentResults.push(result);
  }
  private addToIdentityMap(result: any): any {
    this.registry.index(result);
  }
}
