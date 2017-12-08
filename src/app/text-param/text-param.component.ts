import { Component, OnInit, Injector } from '@angular/core';
import { ParamDescription } from '../models/ro/iresource';

@Component({
  selector: 'app-text-param',
  templateUrl: './text-param.component.html',
  styleUrls: ['./text-param.component.css']
})
export class TextParamComponent implements OnInit {

  private description: ParamDescription;

  constructor(private injector: Injector) {
    this.description = injector.get('args') as ParamDescription;
    console.log(this.description);
   }

  ngOnInit() {
  }

}
