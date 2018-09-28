import { Component, OnInit, Input, Inject } from '@angular/core';
import { MetamodelHelper } from '../services/MetamodelHelper';
import { MetamodelService } from '../services/metamodel.service';
import { Resource } from '../models/ro/iresource';
import { MatTableDataSource, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IXActionResultListItem } from '../models/ro/xaction-result-list';
import { Router } from '@angular/router';
import { ListComponent } from '../list/list.component';

@Component({
  selector: 'app-collection-table',
  templateUrl: './collection-table.component.html',
  styleUrls: ['./collection-table.component.css']
})
export class CollectionTableComponent implements OnInit {

  @Input()
  public CollectionDescriptor: any ;
  @Input()
  public CollectionInstance: any ;
  public elementType: Resource;
  displayedColumns: Array<string> ;
  private columnTypes = {};
  dataSource: MatTableDataSource<IXActionResultListItem>;

  constructor(private metamodel: MetamodelService,
  private router: Router,
  @Inject(MAT_DIALOG_DATA) public data: any,
  private dialogRef: MatDialogRef<ListComponent>) { }

  // pass to datasource
    // for each item, get the result
    // then use the forkjoin solution

    //when property types are preloaded, render table:
      // same as list


  ngOnInit() {

  // instantiate tabledatasource

  this.displayedColumns = this.CollectionInstance.PropertyNames;
  this.dataSource = new MatTableDataSource(this.CollectionInstance.XListItems);
  this.preLoadPropertyTypes();
  }

  get areAllColumnsLoaded(): boolean{
    const totalLoaded =  Object.keys(this.columnTypes).length;
    return this.displayedColumns.length === totalLoaded;
  }

  preLoadPropertyTypes() {
  this.loadElementType().then(type => {
   this.elementType = type;
     this.displayedColumns.forEach(column => this.preLoadPropertyType(column));
    });
  }

   loadElementType(): Promise<any> {
    const elementTypeLink = MetamodelHelper.getFromRel(this.CollectionDescriptor, 'urn:org.restfulobjects:rels/element-type');
     return this.metamodel.get(elementTypeLink);
   }

   preLoadPropertyType(column: string) {
    this.metamodel.getProperty(this.elementType.members, column).then(
      columnData => {
      this.columnTypes[column] = columnData;
    });
   }

   getPropertyReturnType(columnName: string): string {
    const propertyType = this.columnTypes[columnName];
    return this.metamodel.getPropertyType(propertyType);
  }

  getObjectUrl(element: IXActionResultListItem) {
    return 'object/' + encodeURIComponent(element.$$href);
  }
  goTo(selectedElement) {
    this.router.navigate([this.getObjectUrl(selectedElement)]);
    this.dialogRef.close({data: this.data});
  }
}
