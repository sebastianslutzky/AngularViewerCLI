import { Injectable } from '@angular/core';

@Injectable()
export class LayoutComponentFactoryService {

  // Chooses the right component to create based on the next layout element, and creates it
  constructor() { 

  }

  /**
   * name
   */
  public createForElement(element: any): any {
    throw new Error('error') ;
  }

}
