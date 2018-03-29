import { Component, OnInit, Injector, Input } from '@angular/core';
import { ParamDescription } from '../models/ro/iresource';
import { ParamInput } from '../dialog-container/dialog-container.component';
import { ParameterInfo } from '../services/iactioninvoked';

@Component({
  selector: 'app-text-param',
  templateUrl: './text-param.component.html',
  styleUrls: ['./text-param.component.css']
})
export class TextParamComponent implements OnInit {

  get Field(): string{
    return this.Context.params[this.Key].value;
  }
  set Field(value: string){
    this.Context.params[this.Key].value = value;
  }

  Context: any;
  Key: string;
  private description: ParamDescription;

  constructor(private injector: Injector) {
    this.description = (injector.get('args') as ParameterInfo).instance;

    this.Context = injector.get('ctx');
    this.Key = injector.get('key');
    this.Field = this.description.default;

    // TODO: Fix this mess (pass friendly name as an input to this component)
    //const paramInput = this.Context.params[this.Key] as ParamInput;
    //paramInput.name = this.description.name.toLocaleLowerCase().replace(' ', '');
   }

  ngOnInit() {
  }

}
