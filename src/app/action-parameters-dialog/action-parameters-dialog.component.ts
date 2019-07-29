import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ParameterInfo, ActionParametersNeededArgs } from '../services/iactioninvoked';
import { ParamInput } from '../dialog-container/dialog-container.component';
import { ActionParameterCollection } from '../dialog/dialog.component';
import { ActionInvocationService } from '../services/action-invocation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-action-parameters-dialog',
  templateUrl: './action-parameters-dialog.component.html',
  styleUrls: ['./action-parameters-dialog.component.css']
})
export class ActionParametersDialogComponent implements OnInit {
  private args: ActionParametersNeededArgs;
  
  @Output()
  actionCancelled: EventEmitter<{}> = new EventEmitter();
  private ParamInputs: any;
  private ParamsInfo: ParameterInfo[];

  private ActionName: string;

  private ErrorMessage: string;
  private HasError: boolean;
  

  @Input()
  public set Args(value: ActionParametersNeededArgs){
    this.args = value;
    this.ParamsInfo = value.ParameterInfo;
    this.ActionName = this.args.ActionDescriptor.friendlyName;
    this.ParamInputs =  value.ParameterInfo.reduce((map, p) => {
      const input = new ParamInput(p.instance.name, p.instance.default, p.instance.id, p.instance.choices);
      map[input.id] =  input;
      return map;
    }, {});
  }

public cancelar() {
  this.actionCancelled.emit();
}

public validate(){
  console.log('validating!!');
  this.invokeMethod(true);
}


private invokeMethod(validate: boolean) {
    const params = [];
    if (validate) {params.push('x-ro-validate-only'); }

    const args = new ActionParameterCollection(this.ParamInputs);
    return this.invoker.invokeAction(this.args.ObjectAction,
      this.args.ActionDescriptor,
        null,
        args, params).then( x => {
                                // if validation is OK, clear all errors
                                 this.clearValidationMessages();
                                 return x;
                                }
                              )
                              .catch((reason) => {
                                console.log(reason);
                                switch (reason.status) {
                                  case 422:
                                  this.setValidationMessages(reason._body);
                                  break;
                                  //get json to object
                                  //map to param objects
                                  // repopulate params and checkif it refreshes
                                  case 500:
                                  console.log('error 500');
                                  console.log(reason);
                                  this.showEntityValidationError('Error occured.');
                                  return Promise.resolve();
                                  default:
                                  {
                                    throw reason;
                                  }
                                }
                              }
                             );
}

private clearValidationMessages(){
  const params = Object.values(this.ParamInputs) as ParamInput[];
   params.forEach(param => param.invalidReason = '');
  this.clearEntityValidationError();
}

setValidationMessages(responseBody: string) {
   const response = JSON.parse(responseBody);
   const keys =  Object.keys(response);

  keys.forEach(key => {
    if (key === 'x-ro-validate-only') {
      return;
    }
    if (key === 'x-ro-invalidReason') {
     this.showEntityValidationError(response[key]);
    }else {
      const param = this.ParamInputs[key];
      param.invalidReason = response[key].invalidReason;
    }
  });
}

private showEntityValidationError(error: string){
  this.HasError = error > '';
  this.ErrorMessage = error;
}

private clearEntityValidationError() {
  this.HasError = false;
  this.ErrorMessage = '';
}



 public go(f: any) {
    const args = new ActionParameterCollection(this.ParamInputs);

    this.invoker.invokeAction(this.args.ObjectAction,
      this.args.ActionDescriptor,
      null, args).
      catch(reason => {
        if (reason.status === 422) {
          this.setValidationMessages(reason._body);
          return new Promise<any>(null);
        } else {
          this.showEntityValidationError(reason);
          return  Promise.resolve();
        }
      }).then(data => {
         if (!data) { return; }
           const responseObject = JSON.parse(data._body);
           const url = encodeURIComponent(responseObject.$$href);
           this.router.navigate(['object', url]);
       //get $$href property
        //route to object 
      });
  }

  constructor(private invoker: ActionInvocationService, private router: Router) {
  }

  ngOnInit() {
  }

}
