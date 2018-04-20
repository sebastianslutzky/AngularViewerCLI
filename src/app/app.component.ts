import { Component, ElementRef, ViewContainerRef, ViewChild, OnInit, AfterContentInit } from '@angular/core';
import { ActionResult } from './models/ro/iresource';
import { ActionInvocationService } from './services/action-invocation.service';
import { ComponentFactoryService } from './services/component-factory.service';
import { ListComponent } from './list/list.component';
import { DialogComponent } from './dialog/dialog.component';
import { ComponentRef } from '@angular/core/src/linker/component_factory';
import { SessionService } from './services/session.service';
import {ObjectContainerComponent} from './object-container/object-container.component';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements AfterContentInit {

  title = 'app';
  @ViewChild('banner', { read: ViewContainerRef }) private _banner: ViewContainerRef;
  @ViewChild('desktop', { read: ViewContainerRef }) private _desktop: ViewContainerRef;
  @ViewChild('footer', { read: ViewContainerRef }) private _footer: ViewContainerRef;

  constructor(private invoker: ActionInvocationService,
    private componentFactory: ComponentFactoryService,
    private session: SessionService,
    private container: ViewContainerRef,
    private iconRegistry: MatIconRegistry,
    private activatedRoute: ActivatedRoute,
    sanitizer: DomSanitizer) {

      iconRegistry.addSvgIconSet(sanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));

    invoker.actionInvoked.subscribe(data => {
      // action results displayed without routing 
      data.CanvasSize = this.getDesktopDimensions();
      this.componentFactory.createComponent(container, ObjectContainerComponent, {'data': data});
    });

    // action params needed
    invoker.actionParamsNeeded.subscribe(args => {
      if (!args.Canvas) {
        args.Canvas = this._desktop;
      }

      const dialog = this.componentFactory.createComponent(
        args.Canvas,
        DialogComponent, { 'args': args }) as ComponentRef<DialogComponent>;

      dialog.instance.onParamtersCollected.subscribe(data => {
        this.invoker.invokeAction(args.ObjectAction, args.ActionDescriptor, null, data);
      });
    });

//    this.session.DesktopSize = this.getDesktopDimensions();
  }

  getDesktopDimensions(){
    console.log(this._desktop.element.nativeElement.offsetTop);
    console.log(this._footer.element.nativeElement.offsetTop);
    const top = this._desktop.element.nativeElement.offsetTop;
    const bottom = this._footer.element.nativeElement.offsetTop;
    const left = this._desktop.element.nativeElement.offsetLeft;

    return {top: top, height: bottom - top, left: left };
  }

  ngAfterContentInit(): void {
    this.session.DesktopSize = this.getDesktopDimensions();
  }
     // move to card, or ven better, to resource
     getFriendlyName(result): string {

      // if displayng the result of an action (lists)
      if (result.ActionDescriptor) {
        return result.ActionDescriptor.friendlyName;
      }

      // if displaying an object (it should be the only valid case)
      if (result.title) {
        return result.title;
      }

      return 'unknown';
    }
}
