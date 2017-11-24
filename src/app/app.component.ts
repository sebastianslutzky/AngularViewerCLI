import { Component, ElementRef, ViewContainerRef, ViewChild } from '@angular/core';
import { IActionResult } from './models/ro/iresource';
import { ActionInvocationService } from './services/action-invocation.service';
import { ComponentFactoryService } from './services/component-factory.service';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  @ViewChild('desktop', {read: ViewContainerRef}) private _desktop: ViewContainerRef;

  constructor(private invoker: ActionInvocationService,
            private componentFactory: ComponentFactoryService) {
    invoker.actionInvoked.subscribe(data => {
      const component = this.componentFactory.createComponent(this._desktop, ListComponent, {'actionResource': data});
      this._desktop.insert(component.hostView);
  });
 }
}
