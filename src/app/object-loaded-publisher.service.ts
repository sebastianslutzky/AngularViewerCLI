import { Injectable, EventEmitter, Output } from '@angular/core';
import { ObjectRepr } from './models/ro/iresource';
import { ObjectLayout } from './services/layout.service';

@Injectable()
export class ObjectLoadedPublisherService {

  @Output()
  objectLoaded: EventEmitter<ObjectLoadedEventArgs> = new EventEmitter<ObjectLoadedEventArgs>();
  constructor() { }

  Publish(resource: ObjectRepr, layout: ObjectLayout) {
    this.objectLoaded.emit(new ObjectLoadedEventArgs(resource, layout));
  }
}


export class ObjectLoadedEventArgs {
 constructor(public resource: ObjectRepr,
  public layout: ObjectLayout) {}
}
