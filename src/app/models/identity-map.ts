import { IIndexable } from './ro/iresource';

export class IdentityMap<T extends IIndexable > {
  private _elements = [];
  index(element: T): T {
    this._elements[element.indexableKey] = element;
    return element;
  }

   contains(id: string): boolean {
     return id in this._elements;
  }
    // when receiving results, pass it to this registy
    // it will extract hte "self" rel and upsert to this registry
    // later it will need to ensure existing views are refreshed when updating (not inserting)
    // probably via notification (make this observable?)
}
