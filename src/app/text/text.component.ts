import { Component, OnInit, Input, Injector } from '@angular/core';
import { inject } from '@angular/core/testing';
import { ParamDescription } from '../models/ro/iresource';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {

  param: ParamDescription;

  constructor(private injector: Injector) {
    this.param = injector.get('args');
    console.log(this.param);
   }

  ngOnInit() {
  }

}
