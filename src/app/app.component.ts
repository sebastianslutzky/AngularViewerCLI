import { Component, ElementRef, ViewContainerRef, ViewChild } from '@angular/core';
import { ActionResult } from './models/ro/iresource';
import { ActionInvocationService } from './services/action-invocation.service';
import { ComponentFactoryService } from './services/component-factory.service';
import { ListComponent } from './list/list.component';
import { DialogComponent } from './dialog/dialog.component';
import { ComponentRef } from '@angular/core/src/linker/component_factory';
import { SessionService } from './services/session.service';
import {ObjectContainerComponent} from './object-container/object-container.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app';
  @ViewChild('desktop', { read: ViewContainerRef }) private _desktop: ViewContainerRef;

  constructor(private invoker: ActionInvocationService,
    private componentFactory: ComponentFactoryService,
    private session: SessionService,
    private container: ViewContainerRef) {

    invoker.actionInvoked.subscribe(data => {
      this.session.indexResult(data);
      // action results displayed without routing 
      this.componentFactory.createComponent(container, ObjectContainerComponent, {'data': data});
    });

    // action params needed
    invoker.actionParamsNeeded.subscribe(args => {
      if (!args.Canvas) {
        args.Canvas = this._desktop;
      }

      const dialog = this.componentFactory.createComponent(
        args.Canvas,
        DialogComponent, { 'args': args.ActionDescriptor }) as ComponentRef<DialogComponent>;

      dialog.instance.onParamtersCollected.subscribe(data => {
        this.invoker.invokeAction(args.ObjectAction, args.ActionDescriptor, null, data);
      });
    });

  }

     //move to card, or ven better, to resource
     getFriendlyName(result): string {

      // if displayng the result of an action (lists)
      if(result.ActionDescriptor) {
        return result.ActionDescriptor.friendlyName;
      }

      // if displaying an object (it should be the only valid case)
      if(result.title){
        return result.title;
      }

      return 'unknown';
    }
}
