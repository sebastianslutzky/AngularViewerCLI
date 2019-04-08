import { Component, OnInit, ViewChild, Injector, ViewContainerRef, SecurityContext, Input, Inject } from '@angular/core';
import { MatTableDataSource, MatSort, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { XActionResultList, IXActionResultListItem } from '../models/ro/xaction-result-list';
import { ActionInvokedArg } from '../services/iactioninvoked';
import { Resource, ActionDescription } from '../models/ro/iresource';
import { MetamodelService} from '../services/metamodel.service';
import { ComponentFactoryService } from '../services/component-factory.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import { validateConfig } from '@angular/router/src/config';
import { ComponentFactory } from '@angular/core/src/linker/component_factory';
import { error } from 'util';
import { DomSanitizer} from '@angular/platform-browser';
import { MetamodelHelper } from '../services/MetamodelHelper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements AfterViewInit,  OnInit {
  descriptor: ActionDescription;
  displayedColumns: Array<string> ;
  dataSource: MatTableDataSource<IXActionResultListItem>;
  resource: XActionResultList;
  public columns: Array<any>;
  public elementType: Resource;
  @Input()
  public actionResult: ActionInvokedArg;

  private columnTypes = {};

  @ViewChild(MatSort) sort: MatSort;

  constructor(public injector: Injector,
            private metamodel: MetamodelService,
            private viewFactory: ComponentFactoryService,
            private sanitizer: DomSanitizer,
            private dialogRef: MatDialogRef<ListComponent>,
            private router: Router) {
  }

  goTo(selectedElement) {
    this.router.navigate([this.getObjectUrl(selectedElement)]);
    // this.dialogRef.close({data: this.data});
  }

  preLoadPropertyTypes(rawResult: ActionInvokedArg) {
    const elementTypeLink = MetamodelHelper.getFromRel(rawResult.ActionDescriptor, 'urn:org.restfulobjects:rels/element-type');
    this.metamodel.get(elementTypeLink).then( data => {
      this.elementType = data;
      this.displayedColumns.forEach(column => this.metamodel.getProperty(this.elementType.members, column).then(
        columnData => this.columnTypes[column] = columnData));
    });
  }

  get areAllColumnsLoaded(): boolean{
    const totalLoaded =  Object.keys(this.columnTypes).length;
    return this.displayedColumns.length === totalLoaded;
  }

  getPropertyReturnType(columnName: string): string {
    const propertyType = this.columnTypes[columnName];
    return this.metamodel.getPropertyType(propertyType);
  }

  getObjectUrl(element: IXActionResultListItem) {
    return 'object/' + encodeURIComponent(element.$$href);
  }

  renderCell(columName: string, value: string): string {
    switch (this.getPropertyReturnType(columName)) {
      case 'java.lang.String': {
        return value;
      }
      default: {
        return value;
      }
    }
  }

  get actionName(): string {
    return this.descriptor && this.descriptor.extensions.friendlyName || null;
  }

  get timestamp(): string {
    return this.descriptor && this.descriptor.extensions.friendlyName || null;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  ngOnInit(): void {
    if (!this.actionResult) {
      // this.actionResult = this.data.args as ActionInvokedArg;
    }

    // todo: if this class applies to all action results, move to action invocation service
    this.resource = new XActionResultList(this.actionResult.ExtendedResult, this.actionResult.Timestamp);
    this.descriptor = this.actionResult.ActionDescriptor;
    this.dataSource = new MatTableDataSource(this.resource.XListItems);
    this.displayedColumns = this.resource.PropertyNames;

    this.preLoadPropertyTypes(this.actionResult);
  }
}
