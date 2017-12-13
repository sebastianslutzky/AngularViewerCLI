import { Component, OnInit, Injector, Input } from '@angular/core';
import { ParamDescription } from '../models/ro/iresource';
import { ParamInput } from '../dialog-container/dialog-container.component';

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
    this.description = injector.get('args') as ParamDescription;


    this.Context = injector.get('ctx');
    this.Key = injector.get('key');

    // TODO: Fix this mess (pass friendly name as an input to this component)
    (this.Context.params[this.Key] as ParamInput).name = this.description.name.toLocaleLowerCase().replace(' ', '');
   }

  ngOnInit() {
  }

}
