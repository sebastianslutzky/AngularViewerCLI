import { Injectable, Output, EventEmitter } from '@angular/core';
import {IndexedDBAngular} from 'indexeddb-angular';
import { environment } from '../../environments/environment';

@Injectable()
export class ObjectStoreService {

  private _db: IndexedDBAngular;
  private _dbCreation: Promise<any>;

  @Output()
  public onStoreChanged: EventEmitter<string> = new EventEmitter<string>();

  createCollections(db: any) {
    db.currentTarget.result.createObjectStore('domain-types');
    db.currentTarget.result.createObjectStore('universe');
    db.currentTarget.result.createObjectStore('registry');
  }
  constructor() {
    this._db  = new IndexedDBAngular(environment.applicationName, 3);
    this._dbCreation = this._db.createStore(3, this.createCollections);
   }


   public  async add(obj: any, store: string, key: string) {
       this.onStoreChanged.emit(store);
    this._db.add(store, obj, key).then(() => {
  }, (error) => {
      console.log(error);
      console.log('error: ' + key + '-' + store);
      console.trace();
  });
   }

   public upsert(obj: any, store: string, key: string) {
     if (this.containsKey(store, key)) {
       this.onStoreChanged.emit(store);
       this._db.update(store, obj, key);
     } else {
       this.add(obj, store, key);
     }
   }

   public async getAll(store: string): Promise<Array<any>> {
     await this._dbCreation;//ensures db is created
     const items = await this._db.getAll(store);
     return items;
   }

   public get(store: string, key: string): Promise<any> {
    const stored =  this._db.getByKey(store, key).then((found) => {
      return found;
    });
    return stored;
   }

   public async containsKey(store: string, key: string): Promise<boolean> {
     await this._dbCreation;
     const found =  await this.get(store, key);
     return found != null;
   }

}
