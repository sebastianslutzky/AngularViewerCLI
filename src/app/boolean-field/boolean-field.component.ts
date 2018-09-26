import { Component, OnInit, Injector } from '@angular/core';

@Component({
  selector: 'app-boolean-field',
  templateUrl: './boolean-field.component.html',
  styleUrls: ['./boolean-field.component.css']
})
export class BooleanFieldComponent {

  checked: boolean;
  name: string;

  constructor(injector: Injector) {
    const context = injector.get('context');

    this.checked = context.value;
    this.name = context.id;
  }

}
