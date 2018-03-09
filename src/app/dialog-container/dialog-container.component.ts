import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { ComponentFactoryService } from '../services/component-factory.service';
import { ActionDescription } from '../models/ro/iresource';
import { ActionParametersNeededArgs } from '../services/iactioninvoked';

@Component({
  selector: 'app-dialog-container',
  templateUrl: './dialog-container.component.html',
  styleUrls: ['./dialog-container.component.css']
})
export class DialogContainerComponent implements OnInit {
  // pass the whole map to params and the key to the specific param
  // change the param input to the dictionary[key] as the model

  DialogInput: any = {};

  get actionName(): string{
    return this.action.extensions.friendlyName;
  }

  private action: ActionDescription;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.action = data.args as ActionDescription;
   }

  ngOnInit() {
    this.DialogInput.params =  this.action.parameters.reduce((map, p) => {
      map[p.rel] =  new ParamInput();
      return map;
    }, {});
  }
 }

 export class ParamInput {

   public name: string;
   public value = '';

   public toQueryString(): string {
     return `${this.name}=${this.value}` ;
   }
 }

