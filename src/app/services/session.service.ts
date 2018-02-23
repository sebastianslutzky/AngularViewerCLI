import { Injectable } from '@angular/core';
import { IdentityMap } from '../models/identity-map';
import { ActionDescription, ResourceLink } from '../models/ro/iresource';

@Injectable()
export class SessionService {
  public universe: any[] = [];
  private registry: IdentityMap<any>;
  private actionDescriptors: IdentityMap<ActionDescription>;

  constructor() {
    this.registry = new IdentityMap();
    this.actionDescriptors = new IdentityMap();
  }

  indexResult(result: any): any {
   this.addToIdentityMap(result);
   this.addToUniverse(result);
  }

  indexActionDescriptor(action: ActionDescription) {
    this.actionDescriptors.index(action);
  }

  private addToUniverse(result: any) {
    this.universe.push(result);
  }
  private addToIdentityMap(result: any): any {
    this.registry.index(result);
  }

  public containsAction(link: ResourceLink): boolean {
    return this.actionDescriptors.contains(link.href);
  }
}


