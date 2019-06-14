import { Component, OnInit, Injector, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ParamDescription } from '../models/ro/iresource';
import { ParamInput } from '../dialog-container/dialog-container.component';
import { ParameterInfo } from '../services/iactioninvoked';
import { inherits } from 'util';
import { stringify } from '@angular/core/src/render3/util';

export interface IValidatable {
  onBlur: EventEmitter<string>;
}

@Component({
  selector: 'app-text-param',
  templateUrl: './text-param.component.html',
  styleUrls: ['./text-param.component.css']
})
export class TextParamComponent implements OnInit , IValidatable {

  data: ParamInput;
  Context: any;
  Key: string;
  private description: ParamDescription;

  @ViewChild('inputControl') private inputControl: any;
  
@Output()
  public onBlur: EventEmitter<string> = new EventEmitter<string>();
  private getInputContext(): ParamInput {
    return this.Context[this.Key] as ParamInput;
  }

  get Field(): string{
    return this.Context[this.Key].value;
  }
  set Field(value: string){
    this.Context[this.Key].value = value;
  }

  get HasErrors(): boolean{
    return  this.ErrorMessage >  '';
  }

  get ErrorMessage(): string{
    const ctx = this.getInputContext();
    return ctx.invalidReason;
  }


  constructor(private injector: Injector) {

    this.description = (injector.get('args') as ParameterInfo).instance;

    this.Context = injector.get('ctx');
    this.Key = injector.get('key');
    this.getInputContext().OnErrorMessageChanged.subscribe(x => console.log('I know you changed to ' + x));

    // TODO: Fix this mess (pass friendly name as an input to this component)
    //const paramInput = this.Context.params[this.Key] as ParamInput;
    //paramInput.name = this.description.name.toLocaleLowerCase().replace(' ', '');
   }

   private ErrorClass(): string {
     if (this.HasErrors) {
       return 'has-error';
     }
     return '';
   }

   private inputBlurred() {
    this.onBlur.emit(this.Key);
   }

  ngOnInit() {
  }

}
