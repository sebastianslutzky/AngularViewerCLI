import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatSnackBar } from '@angular/material';
import { DialogComponent, ActionParameterCollection } from '../dialog/dialog.component';
import { ComponentFactoryService } from '../services/component-factory.service';
import { ActionDescription, ObjectAction } from '../models/ro/iresource';
import { ActionParametersNeededArgs, ParameterInfo } from '../services/iactioninvoked';
import { ActionInvocationService } from '../services/action-invocation.service';
import { invoke } from 'q';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-container',
  templateUrl: './dialog-container.component.html',
  styleUrls: ['./dialog-container.component.css']
})
export class DialogContainerComponent implements OnInit {
  // pass the whole map to params and the key to the specific param
  // change the param input to the dictionary[key] as the model

  DialogInput: any = {};
  private validationError: string;

  @Output()
  onParametersCollected: EventEmitter<ActionParameterCollection> = new EventEmitter();
  @Output()
  onActionInvoked: EventEmitter<string> = new EventEmitter();
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
  public validationErrorBar: MatSnackBar,
  private dialogRef: MatDialogRef<DialogContainerComponent>,
  private invoker: ActionInvocationService,
  private router: Router) {
    this.args = data.args as ActionParametersNeededArgs;
   }

  ngOnInit() {
    // this.parameters = this.args.ParametersInfo;
    this.DialogInput.params =  this.parameters.reduce((map, p) => {
      const input = new ParamInput(p.instance.name, p.instance.default, p.instance.id,p.instance.choices);
      map[input.id] =  input;
      return map;
    }, {});
  }

  private go() {
      this.validationError = null;
      const args = new ActionParameterCollection(this.DialogInput.params);
      this.invoker.invokeAction(this.args.ObjectAction,
                                this.args.ActionDescriptor,
                                null, args).
                                catch(reason => {
                                  if (reason.status === 422) {
                                    this.setValidationMessages(reason._body);
                                    return new Promise<any>(null);
                                  } else {
                                    return  Promise.reject(reason);
                                  }
                                }).then(data => {
                                    const responseObject = JSON.parse(data._body);
                                    const url = encodeURIComponent(responseObject.$$href);
                                    this.router.navigate(['object', url]);
                                  }
                                  //get $$href property
                                  //route to object 
                                );
  }

  private invokeValidation() {
      const args = new ActionParameterCollection(this.DialogInput.params);
      this.invoker.validateAction(this.args.ObjectAction,
                                this.args.ActionDescriptor,
                                null, args).catch((reason) => {
                                  if (reason.status === 422) {
                                    this.setValidationMessages(reason._body);
                                    //get json to object
                                    //map to param objects
                                    // repopulate params and checkif it refreshes
                                  } else {
                                    throw reason;
                                  }
                                }
                               );
  }
  setValidationMessages(responseBody: string) {
    const response = JSON.parse(responseBody);
    const keys =  Object.keys(response);

    keys.forEach(key => {
      if (key === 'x-ro-invalidReason') {
        this.showEntityValidationError(response[key]);
      }else {
        const param = this.DialogInput.params[key];
        param.invalidReason = response[key].invalidReason;
      }
    });
}

showEntityValidationError(msg: string){
  if (this.validationError === msg) {
    return;
  }

  this.validationError = msg;
  this.validationErrorBar.open(this.validationError, null, {
  duration: 2000,
  panelClass: ['red-snackbar']});
 }
}


 export class ParamInput {

  public OnErrorMessageChanged = new EventEmitter<string>();


  private _invalidReason: string;
  public set invalidReason(value: string){
    if (value !== this._invalidReason) {
      this.OnErrorMessageChanged.emit(value);
    }
    this._invalidReason = value;
  }

  public get invalidReason(): string {
    return this._invalidReason;
  }

   constructor(public name: string,
    public value: string,
    public id: string,
    public choices: Array<any>) {
   }

   public toQueryString(): string {
     return `${this.id}=${this.value}` ;
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

