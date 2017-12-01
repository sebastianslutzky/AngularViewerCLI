import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { XActionResultList, IXActionResultListItem } from '../models/ro/xaction-result-list';
import { ActionInvokedArg } from '../services/iactioninvoked';
import { IResource } from '../models/ro/iresource';
import { MetamodelService } from '../services/metamodel.service';
import { ComponentFactoryService } from '../services/component-factory.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import { validateConfig } from '@angular/router/src/config';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements AfterViewInit {
  descriptor: IResource;
  displayedColumns: Array<string> ;
  dataSource: MatTableDataSource<IXActionResultListItem>;
  resource: XActionResultList;
  public columns: Array<any>;

  public elementType: IResource;
  private columnTypes = {};

  @ViewChild(MatSort) sort: MatSort;

  constructor(public injector: Injector, private metamodel: MetamodelService, private viewFactory: ComponentFactoryService) {
    const rawResult = this.injector.get('actionResource') as ActionInvokedArg;
    // todo: if this class applies to all action results, move to action invocation service
    this.resource = new XActionResultList(rawResult.ExtendedResult);
    this.displayedColumns = this.resource.PropertyNames;
    this.descriptor = rawResult.ActionDescriptor;
    this.dataSource = new MatTableDataSource(this.resource.XListItems);
    // in list component, find rel urn:org.restfulobjects:rels/element-type and get
    const elementTypeLink = this.metamodel.getFromRel(rawResult.ActionDescriptor, 'urn:org.restfulobjects:rels/element-type');
    this.metamodel.get(elementTypeLink).subscribe(data => {
      this.elementType = data;
      this.initializeColumns();
    });
    //TODO: initializeColumnViewType
    //      (for each column, load the type, then decide which is the associated view)
    //      don't start rendering the table unless ColumnsInitialised
  }

  get areAllColumnsLoaded(): boolean{
    const totalLoaded =  Object.keys(this.columnTypes).length;
    return this.displayedColumns.length === totalLoaded;
  }

  initializeColumns() {
    console.log(typeof this.displayedColumns);
    // tslint:disable-next-line:forin
    for (const column of this.displayedColumns) {
      // todo: get this working:
        // trigger a download of the property description.
        // increment loadedColumns when resolved
        // implement getAllColumnsLoaded()
        // check if getAllCOlumnsLoaded() before rendenring table
      // when rendering table, delegate to renderCell(column,value) which will get the columnType
      // , choose the right control to use, and then render it. initially in plain text as a diirective
      // then maybe as a componentFactory
      const propertyLink = this.metamodel.getProperty(this.elementType.members, column).subscribe(
        data => {
          this.columnTypes[column] = data ;
        }
      );
    }
  }

  renderCell(columName: string, value: string): string {
    console.log(' rendering column ' + columName);
    console.log(value);
    return value;
  }

  get actionName(): string {
    return this.descriptor && this.descriptor.extensions.friendlyName || null;
  }

  private getColumnType(column: string): IResource {
    if (this.columnTypes[column]) {
      return this.columnTypes[column];
    }

    const propertyLink = this.metamodel.getProperty(this.elementType.members, column).subscribe(
      data => this.columnTypes[column] = data
    );
    return null;
  }

  addCellView(column: string, value: string, container: any) {
    const type = this.getColumnType(column);
    if (!type) {
      return;
    }

    const typeDescr = this.metamodel.findFromRel(type.links,'urn:org.restfulobjects:rels/return-type');
    console.log(typeDescr);

  }

  getPropertyType(column: string): Observable<IResource> {
    const propertyLink = this.metamodel.getProperty(this.elementType.members, column);
    return propertyLink as Observable<IResource>;
    // http://localhost:8080/restful/domain-types/org.incode.eurocommercial.contactapp.dom.contacts.Contact/properties/company",
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
