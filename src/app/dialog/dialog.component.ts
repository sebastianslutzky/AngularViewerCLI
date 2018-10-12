import { Component, OnInit, Injector, EventEmitter, Output } from '@angular/core';
import { MetamodelService } from '../services/metamodel.service';
import { ComponentFactoryService } from '../services/component-factory.service';
import {MatDialog} from '@angular/material';
import { DialogContainerComponent, ParamInput } from '../dialog-container/dialog-container.component';
import { ActionParametersNeededArgs, ParameterInfo } from '../services/iactioninvoked';
import { ActionDescription, ObjectAction } from '../models/ro/iresource';
import { ActionInvocationService } from '../services/action-invocation.service';

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
    private invoker: ActionInvocationService) {
       this.args = injector.get('args');
       this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContainerComponent, {
      data : {args: this.args}
    });

    const dialog = dialogRef.componentInstance as DialogContainerComponent;

    dialog.onParametersCollected.subscribe(result => {
      const args = new ActionParameterCollection(result.params);
      this.invoker.invokeAction(this.args.ObjectAction,
        this.args.ActionDescriptor,
        null,
        args).catch(reason => {
          if (reason.status === 422) {
            console.log('all good');
            this.setValidationMessages(reason._body,dialog);
            return new Promise<any>(null);
          } else {
            return  Promise.reject(reason);
          }
        }).then(value => console.log('it works'));
      });
    }


    findParamWIthId(id: string,params: ParameterInfo[]): ParameterInfo {
      const found = params.filter(param => param.instance.id === id);
      return found[0];
    }

    setValidationMessages(responseBody: string,dialog: DialogContainerComponent) {
      const response = JSON.parse(responseBody);
      const keys =  Object.keys(response);

      keys.forEach(key => {
        if(response[key].hasOwnProperty('invalidReason')) {
          const param = this.findParamWIthId(key, dialog.parameters);
          param.instance.value = 'hola';
          // dialog.setInvalidReason(key, response[key]['invalidReason']);
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
