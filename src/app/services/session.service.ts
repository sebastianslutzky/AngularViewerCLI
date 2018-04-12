import { Injectable } from '@angular/core';
import { IdentityMap } from '../models/identity-map';
import { ActionDescription, ResourceLink, IIndexable } from '../models/ro/iresource';

@Injectable()
export class SessionService {
  public NavigatingBack: boolean;
  private universe: IdentityMap<any>;
  private registry: IdentityMap<any>;
  private objectDescriptors: IdentityMap<any>;
  private actionDescriptors: IdentityMap<ActionDescription>;

  public Overlays: number;

  public IncrementOverlays() {
    this.Overlays++;
  }

  public DecrementOverlays() {
    this.Overlays--;
  }
  constructor() {
    this.registry = new IdentityMap();
    this.universe = new IdentityMap();
    this.objectDescriptors = new IdentityMap();
    this.actionDescriptors = new IdentityMap();
    this.Overlays = 0;
  }

  indexResult(result: any): any {
   this.addToIdentityMap(result);
   this.addToUniverse(result);
  }

  indexActionDescriptor(action: ActionDescription) {
    this.actionDescriptors.index(action);
  }

  private addToUniverse(result: any) {
    this.universe.index(result);
  }
  private addToIdentityMap(result: IIndexable): any {
    return this.registry.index(result);
  }

  public containsAction(link: ResourceLink): boolean {
    return this.actionDescriptors.contains(link.href);
  }

  public containsObjectDescriptor(key) {
     return this.objectDescriptors.contains(key);
  }

  public getDescriptor(key){
    return this.objectDescriptors.Items[key];
  }

  public indexObjectDescriptor(objectDescriptor, key) {
    this.objectDescriptors.index(objectDescriptor, key);
  }

  public getUniverseItems():Iterable<any>{
    return this.universe.Items;
  }
}


