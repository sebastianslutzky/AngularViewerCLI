import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {

  public currentResults: Set<any>;
  constructor() {
    this.currentResults = new Set<any>();
   }

  indexCurrentResult(result: any): any {
    this.currentResults.add(result);
  }
}
