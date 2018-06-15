import { Injectable, Output, EventEmitter } from '@angular/core';
import { IdentityMap } from '../models/identity-map';
import { ActionDescription, ResourceLink, IIndexable } from '../models/ro/iresource';
import { ObjectStoreService, IStorageSpec } from './object-store.service';
import { isArray } from 'util';
import { attachEmbeddedView } from '@angular/core/src/view';

@Injectable()
export class SessionService {
  public NavigatingBack: boolean;
  private universe: IdentityMap<any>;
  private registry: IdentityMap<any>;
  private objectDescriptors: IdentityMap<any>;
  private actionDescriptors: IdentityMap<ActionDescription>;
  private _objectStore: ObjectStoreService;

  @Output()
  public onUniverseChanged: EventEmitter<void> = new EventEmitter<void>();

  public DesktopSize: any;


  constructor(private objectStore: ObjectStoreService) {
    this.registry = new IdentityMap();
    this.universe = new IdentityMap();
    this.objectDescriptors = new IdentityMap();
    this.actionDescriptors = new IdentityMap();
    this._objectStore = objectStore;
    this._objectStore.onStoreChanged.subscribe(store => {
        if (store === 'universe') {
          this.onUniverseChanged.emit();
        }
      }
      );
  }
  indexResult(result: any): any {
   this.addToIdentityMap(result);
   this.addToUniverse(result);
  }


  indexActionDescriptor(action: ActionDescription) {
    this.actionDescriptors.index(action);
    this._objectStore.add(action, 'domain-types', action.indexableKey);
  }

  private addToUniverse(result: IIndexable) {
    this._objectStore.upsert(result, 'universe', result.indexableKey);
  }

  private addToIdentityMap(result: IIndexable): any {
    this._objectStore.upsert(result, 'registry', result.indexableKey);
    return this.registry.index(result);
  }

  public async getDomainType(link: ResourceLink): Promise<any> {
    return this._objectStore.get('domain-types', link.href);
  }

  public containsObjectDescriptor(key) {
     return this.objectDescriptors.contains(key);
  }

  public getDescriptor(key) {
    return this.objectDescriptors.Items[key];
  }

  public getFromStore(store: IStorageSpec, key: string) {
    return this._objectStore.get(store.name, key);
  }

  public indexInStore(storeName: string, object: any, key: string) {
    this._objectStore.add(object, storeName, key);
  }

  public indexObjectDescriptor(objectDescriptor, key) {
    this.objectDescriptors.index(objectDescriptor, key);
  }

  public  async getUniverseItems(): Promise<Array<any>> {
    const items = await this._objectStore.getAll('universe');
    if (isArray(items)) {
      const array = items as Array<any>;
      return array;
    }
    throw new Error('not an array');
  }
}


