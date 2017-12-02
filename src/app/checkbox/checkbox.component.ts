import { Component, OnInit, Injector } from '@angular/core';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {
  checked: boolean;

  constructor(private injector: Injector) {
    this.checked = injector.get('value');
  }

  ngOnInit() {
  }

}
