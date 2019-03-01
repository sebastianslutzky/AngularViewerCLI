import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { DialogComponent, ActionParameterCollection } from '../dialog/dialog.component';
import { ComponentFactoryService } from '../services/component-factory.service';
import { ActionDescription, ObjectAction } from '../models/ro/iresource';
import { ActionParametersNeededArgs, ParameterInfo } from '../services/iactioninvoked';
import { ActionInvocationService } from '../services/action-invocation.service';

@Component({
  selector: 'app-dialog-container',
  templateUrl: './dialog-container.component.html',
  styleUrls: ['./dialog-container.component.css']
})
export class DialogContainerComponent implements OnInit {
  // pass the whole map to params and the key to the specific param
  // change the param input to the dictionary[key] as the model

  DialogInput: any = {};

  @Output()
  onParametersCollected: EventEmitter<ActionParameterCollection> = new EventEmitter();

  get actionName(): string{
    return this.actionDescr.extensions.friendlyName;
  }

  parameters: ParameterInfo[];

  get actionDescr(): ActionDescription{
    return this.args.ActionDescriptor;
  }

  get action(): ObjectAction{
    return this.args.ObjectAction;
  }
  private args: ActionParametersNeededArgs;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, 
  private dialogRef: MatDialogRef<DialogContainerComponent>,
  private invoker: ActionInvocationService) {
    this.args = data.args as ActionParametersNeededArgs;
   }

  ngOnInit() {
    this.parameters = this.args.ParametersInfo;
    this.DialogInput.params =  this.parameters.reduce((map, p) => {
      const input = new ParamInput(p.instance.name, p.instance.default, p.instance.id);
      map[p.typeLink.rel] =  input;
      return map;
    }, {});
    //1 call validate with current parameters
    
    //2 if error returned, disable button
    //3                    populate general error at bottom
    //4                    populate field error on field
    //5 do the same (1) after tabbing out of each control
  }

  private go() {
    this.onParametersCollected.emit(this.DialogInput);
  }

  private invokeValidation() {
      const args = new ActionParameterCollection(this.DialogInput.params);
      this.invoker.invokeAction(this.args.ObjectAction,
                                this.args.ActionDescriptor,
                                null, args);
  }
 }



 export class ParamInput {

  public invalidReason: string ;

   constructor(public name: string, public value: string, public id: string) {
   }

   public toQueryString(): string {
     return `${this.name}=${this.value}` ;
   }

   public toJson(): string {

     let jsonValue = JSON.stringify(this.safeString(this.value));
     if (jsonValue) {
        jsonValue = `"${jsonValue}"`;
     }
     return `"${this.safeString(this.id)}": {"value" :  {${jsonValue}}}`;
   }




   private safeString(value: string): string {
     if (value) {
      return value;
     }

     return '';
   }
 }

