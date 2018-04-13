import { Component, OnInit, Inject } from '@angular/core';
import { ComponentFactoryService } from '../services/component-factory.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ObjectRepr, ObjectMember, ResourceLink } from '../models/ro/iresource';
import { OutletContext, Router } from '@angular/router';

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css']
})
export class ObjectComponent implements OnInit {

  private objectData: ObjectRepr;

  private title: string;

  constructor( @Inject(MAT_DIALOG_DATA) public data: any,
        private route: Router,
        private dialogRef: MatDialogRef<ObjectComponent>) {
    this.objectData = data.args as ObjectRepr;

    this.title = this.objectData.title;
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
    this.dialogRef.close({routed: true});
   }
  getObjectUrl(element: string) {
    return 'object/' + encodeURIComponent(element);
  }

  ngOnInit() {}
    // done get properties only
    // for each prop, create a StringFieldComponent via factory
    // show all property/value pairs in text
    // then choose depending on the type (will need to create one for each type)
}
