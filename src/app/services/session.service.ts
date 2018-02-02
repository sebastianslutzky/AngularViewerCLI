import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {

  public currentResults: any[] = [];
  public shelvedResults: any[] = [];

  indexCurrentResult(result: any): any {
    this.currentResults.push(result);
  }
}
