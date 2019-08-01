import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ObjectRepr, ObjectMember, ResourceLink } from '../models/ro/iresource';
import { Router } from '@angular/router';
import { ObjectLayout, LayoutService } from '../services/layout.service';
import { environment } from '../../environments/environment';
import { MetamodelService } from '../services/metamodel.service';
import { LayoutComponentFactoryService } from '../layout-component-factory.service';

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css']
})
export class ObjectComponent implements OnInit {

  private objectData: ObjectRepr;
  private layout: ObjectLayout;

  @Input()
  set Layout(value: ObjectLayout){
   this.layout = value;
  }

  @Input()
  set Context(value: ObjectRepr){
   this.objectData = value;
    this.title = this.objectData.title;
  }



  private title: string;

  constructor(
     private route: Router,
        private layoutService: LayoutService,
      private metaModel: MetamodelService,
      private factory: LayoutComponentFactoryService) {

   }

   get showDebugMenu(): boolean{
     return environment.showDebugMenu;
   }

   get properties(): ObjectMember[]{
     return this.members.filter(m => m.memberType === 'property');
   }
   get actions(): ObjectMember[]{
     return this.members.filter(m => m.memberType === 'action');
   }
   get collections(): ObjectMember[]{
     return this.members.filter(m => m.memberType === 'collection');
   }
   get members(): ObjectMember[]{
    return Object.keys(this.objectData.members)
      .map((m) => {
        return this.objectData.members[m];
      } );
   }

   onCollectionItemClicked(item: ResourceLink) {
    this.route.navigate([this.getObjectUrl(item.href)]);
   }
  getObjectUrl(element: string) {
    return 'object/' + encodeURIComponent(element);
  }

  debugContent() {
    const url =  this.metaModel.getSelf(this.objectData);
    window.open(url.href, '_blank');
  }
  debugLayout() {
    const url =  this.layoutService.getUrl(this.objectData);
    window.open(url, '_blank');
  }


  ngOnInit() {
  }
}
