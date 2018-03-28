import { IIndexable } from './ro/iresource';

export class IdentityMap<T extends IIndexable > implements Iterator<T> {
  private _elements = [];
  index(element: T, key = null): T {
    if (key != null) {
      this._elements[key] = element;
    }
    this._elements[element.indexableKey] = element;
    return element;
  }

  get Items(): Iterable<T>{
    return Object.values(this._elements);
  }

   contains(id: string): boolean {
     return id in this._elements;
  }

  public next(): IteratorResult<T> {
    return {
        done: true,
        value: null
    };
}

    // when receiving results, pass it to this registy
    // it will extract hte "self" rel and upsert to this registry
    // later it will need to ensure existing views are refreshed when updating (not inserting)
    // probably via notification (make this observable?)
}
