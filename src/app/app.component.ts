import { Component } from '@angular/core';
import { IActionResult } from './models/ro/iresource';
import { ActionInvocationService } from './services/action-invocation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(private invoker: ActionInvocationService) {
    invoker.actionInvoked.subscribe(data => {
      console.log('action invoked');
      console.log(data);
    });
  }
}
