import { Component, OnInit, ViewChild, Injector } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { XActionResultList, IXActionResultListItem } from '../models/ro/xaction-result-list';
import { ActionInvokedArg } from '../services/iactioninvoked';
import { IResource } from '../models/ro/iresource';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, AfterViewInit {
  descriptor: IResource;
  displayedColumns = [];
  dataSource: MatTableDataSource<IXActionResultListItem>;
  resource: XActionResultList;
  public columns: Array<any>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(public injector: Injector) {
    const rawResult  = this.injector.get('actionResource') as ActionInvokedArg;
    // todo: if this class applies to all action results, move to action invocation service
    this.resource = new XActionResultList(rawResult.ExtendedResult);
    this.displayedColumns = this.resource.PropertyNames;
    this.descriptor = rawResult.ActionDescriptor;
    this.dataSource = new MatTableDataSource(this.resource.XListItems);
  }

  get actionName(): string{
    return this.descriptor && this.descriptor.extensions.friendlyName || null;
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
