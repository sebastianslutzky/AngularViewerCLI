import { Injectable } from '@angular/core';
import { IdentityMap } from '../models/identity-map';

@Injectable()
export class SessionService {
  public universe: any[] = [];
  private registry: IdentityMap;

  constructor() {
    this.registry = new IdentityMap();
  }

  indexResult(result: any): any {
   this.addToIdentityMap(result);
   this.addToUniverse(result);
  }

  private addToUniverse(result: any) {
    this.universe.push(result);
  }
  private addToIdentityMap(result: any): any {
    this.registry.index(result);
  }
}
