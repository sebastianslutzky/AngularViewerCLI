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
import { IResourceLink } from '../models/ro/iresource-link';

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

  constructor(public injector: Injector,
            private metamodel: MetamodelService,
            private viewFactory: ComponentFactoryService) {
    const rawResult = this.injector.get('actionResource') as ActionInvokedArg;
    // todo: if this class applies to all action results, move to action invocation service
    this.resource = new XActionResultList(rawResult.ExtendedResult);
    this.descriptor = rawResult.ActionDescriptor;
    this.dataSource = new MatTableDataSource(this.resource.XListItems);
    this.displayedColumns = this.resource.PropertyNames;

    this.preLoadPropertyTypes(rawResult);
  }

  preLoadPropertyTypes(rawResult: ActionInvokedArg) {
    const elementTypeLink = this.metamodel.getFromRel(rawResult.ActionDescriptor, 'urn:org.restfulobjects:rels/element-type');
    this.metamodel.get(elementTypeLink).subscribe(data => {
      this.elementType = data;
      this.displayedColumns.forEach(column => this.metamodel.getProperty(this.elementType.members, column).subscribe(
        columnData => this.columnTypes[column] = columnData));
    });
  }

  get areAllColumnsLoaded(): boolean{
    const totalLoaded =  Object.keys(this.columnTypes).length;
    return this.displayedColumns.length === totalLoaded;
  }

  renderCell(columName: string, value: string): string {
    const propertyType = this.columnTypes[columName];
    const returnType = this.metamodel.getPropertyType(columName, propertyType);
    switch (returnType) {
      case 'java.lang.String': {
        return value;
      }
      default: {
        console.warn('don\'t know how to render columns of type: ' + returnType + '. Viewing as string');
        return value;
      }
    }
  }

  get actionName(): string {
    return this.descriptor && this.descriptor.extensions.friendlyName || null;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
