import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { ComponentFactoryService } from '../services/component-factory.service';
import { ActionDescription, ObjectAction } from '../models/ro/iresource';
import { ActionParametersNeededArgs, ParameterInfo } from '../services/iactioninvoked';

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
    return this.actionDescr.extensions.friendlyName;
  }

  get parametros(): ParameterInfo[]{
    return this.args.ParametersInfo.slice(0, 1);
  }

  get actionDescr(): ActionDescription{
    return this.args.ActionDescriptor;
  }

  get action(): ObjectAction{
    return this.args.ObjectAction;
  }
  private args: ActionParametersNeededArgs;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.args = data.args as ActionParametersNeededArgs;
   }

  ngOnInit() {
    this.DialogInput.params =  this.parametros.reduce((map, p) => {
      map[p.typeLink.rel] =  new ParamInput();
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

