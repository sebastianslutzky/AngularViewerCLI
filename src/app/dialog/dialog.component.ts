import { Component, OnInit, Injector, EventEmitter, Output } from '@angular/core';
import { MetamodelService } from '../services/metamodel.service';
import { ComponentFactoryService } from '../services/component-factory.service';
import {MatDialog} from '@angular/material';
import { DialogContainerComponent, ParamInput } from '../dialog-container/dialog-container.component';
import { ActionParametersNeededArgs, ParameterInfo } from '../services/iactioninvoked';
import { ActionDescription, ObjectAction } from '../models/ro/iresource';
import { ActionInvocationService } from '../services/action-invocation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  private args: ActionParametersNeededArgs;
  @Output()
  onParamtersCollected: EventEmitter<ActionParameterCollection> = new EventEmitter();


  // this component could be reduced to just 1 static handler function that opens the dialog
  constructor(
    public dialog: MatDialog,
    public injector: Injector,
    private invoker: ActionInvocationService,
    private router: Router) {
       this.args = injector.get('args');
       this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContainerComponent, {
      data : {args: this.args},  width: '25em'
    });

    const dialog = dialogRef.componentInstance as DialogContainerComponent;

    dialog.onActionInvoked.subscribe(result => {
                                    dialogRef.close();
                                  });
    }


    findParamWIthId(id: string,input: any): ParamInput {
      const values = Object.values(input);
      const found = values.filter((item: ParamInput) => item.id === id);
      return found[0] as ParamInput;
    }

    setValidationMessages(responseBody: string,dialog: DialogContainerComponent) {
      const response = JSON.parse(responseBody);
      const keys =  Object.keys(response);

      keys.forEach(key => {
        if(response[key].hasOwnProperty('invalidReason')) {
          const param = this.findParamWIthId(key, dialog.DialogInput.params);
          param.invalidReason = response[key].invalidReason;
        }
      });

      // const types = this.ActionDescriptor.parameters;
      // const paramType =  keys.map((key, index) =>
      //  new ParameterInfo(this.ObjectAction.parameters[key], types[index]));

      // return paramType;

  }
}

export class ActionParameterCollection {
  constructor(public params: {[key: string]: ParamInput}) {}

  public asQueryString(): string {
   const params = Object.values(this.params).map(input => input.toQueryString());
   return params.join('&');
  }

  public asJsonBody(): string {
    const inputs = Object.values(this.params);
    const reducer = (accumulator, currentValue) => {accumulator[currentValue.id] = {value: currentValue.value || null}; return accumulator;}
    const reduced = inputs.reduce(reducer, {});
    return JSON.stringify(reduced);
  }
}
