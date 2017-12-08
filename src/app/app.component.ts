import { Component, ElementRef, ViewContainerRef, ViewChild } from '@angular/core';
import { ActionResult } from './models/ro/iresource';
import { ActionInvocationService } from './services/action-invocation.service';
import { ComponentFactoryService } from './services/component-factory.service';
import { ListComponent } from './list/list.component';
import { DialogComponent } from './dialog/dialog.component';

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
       this.componentFactory.createComponent(this._desktop, ListComponent, {'actionResource': data});
    });

    invoker.actionParamsNeeded.subscribe(args => {
      if (!args.Canvas) {
        args.Canvas = this._desktop;
      }
       this.componentFactory.createComponent(args.Canvas, DialogComponent, {'args': args.ActionDescriptor});
    });
 }
}
