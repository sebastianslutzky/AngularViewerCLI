import { Component, OnInit, Injector, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ParamDescription } from '../models/ro/iresource';
import { ParamInput } from '../dialog-container/dialog-container.component';
import { ParameterInfo } from '../services/iactioninvoked';
import { inherits } from 'util';
import { stringify } from '@angular/core/src/render3/util';
import { IValidatable } from '../text-param/text-param.component';


@Component({
  selector: 'app-choices-param',
  templateUrl: './choices-param.component.html',
  styleUrls: ['./choices-param.component.css']
})
export class ChoicesParamComponent implements OnInit , IValidatable {

  data: ParamInput;
  Context: any;
  Choices: ChoiceParamInput[];
  Key: string;
  private description: ParamDescription;

  private daField: any;
  @ViewChild('inputControl') private inputControl: any;
  
@Output()
  public onBlur: EventEmitter<string> = new EventEmitter<string>();
  private getInputContext(): ParamInput {
    return this.Context[this.Key] as ParamInput;
  }

  private getChoices(): any[] {
    return this.getInputContext().choices;
  }

  get Field(): any{
    return this.daField;
  }
  set Field(value: any){
   this.Context[this.Key].value = value.value;
   this.daField = value;
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

    this.Choices =  this.getInputContext().choices;
    this.Choices = this.getInputContext().choices.map<ChoiceParamInput>(
      ((aChoice, index) => {
        if (aChoice !== Object(aChoice)) {
            return new ChoiceParamInput(aChoice, aChoice, index);
        }
        if (aChoice['title']) {
            return new ChoiceParamInput(aChoice.title, aChoice, index);
        }

        console.error(aChoice);
        throw new Error('Choice has no title or href');
      }
    ));
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

   class ChoiceParamInput {
     constructor(public title: string, public value: string, private index: number) { }
   }
