import { Injectable } from '@angular/core';
import { ObjectRepr } from '../models/ro/iresource';
import { HttpClientWithAuthService } from './http-client-with-auth.service';
import { Observable } from 'rxjs/Observable';
import { MetamodelService } from './metamodel.service';
import { MetamodelHelper } from './MetamodelHelper';

@Injectable()
export class LayoutService {

  constructor(private http: HttpClientWithAuthService) {
    const f = '';
   }

   public load(repr: ObjectRepr): Observable<ObjectLayout> {
    const describedBy = MetamodelHelper.getFromRel(repr, 'describedby');
    return this.http.load(ObjectLayout, describedBy.href + '/layout', false, null, 'GET', 'xml');
   }
}


export class ObjectLayout {
  public grid: any;

  getPropertyTabs(): any[] {
    // for now, ignore rows and cols (return property group only)
    const rows = this.grid.row as any[];

    const allCols =  rows.reduce((accumulator, currentValue) => accumulator.concat(currentValue.col), []);
    const allPropertyGroups = allCols.reduce(
      (accumulator, currentValue) => currentValue.tabGroup ?  accumulator.concat(currentValue.tabGroup) : accumulator, []);

    const allTabs = allPropertyGroups.reduce(
      (accumulator, currentValue) => accumulator.concat(currentValue.tab), []);

    return allTabs;
  }

  getCollections():  any[] {
    const rows = this.grid.row as any[];

    const allCols =  rows.reduce((accumulator, currentValue) => accumulator.concat(currentValue.col), []);
    const allCollGroups = allCols.reduce(
      (accumulator, currentValue) => currentValue.collection ?  accumulator.concat(currentValue.collection) : accumulator, []);

    return allCollGroups;
  }
}
