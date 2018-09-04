import { Injectable, ErrorHandler, Injector, EventEmitter } from '@angular/core';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {
  public unhandledErrorOccured: EventEmitter<Error> = new EventEmitter<Error>();

  handleError(error: Error): void {
    if (error) {
      console.error(error);
      this.unhandledErrorOccured.emit(error);
     }
  }

  constructor(public injector: Injector) { }

}
