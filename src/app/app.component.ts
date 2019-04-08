import { Component, ElementRef, ViewContainerRef, ViewChild, OnInit, AfterContentInit } from '@angular/core';
import { ActionResult, ActionDescription } from './models/ro/iresource';
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
import { ObjectStoreService } from './services/object-store.service';
import { MetamodelService } from './services/metamodel.service';
import { ListActionResultComponent } from './list-action-result/list-action-result.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements AfterContentInit {

  title = 'app';
  @ViewChild('banner', { read: ViewContainerRef }) private _banner: ViewContainerRef;
  @ViewChild('footer', { read: ViewContainerRef }) private _footer: ViewContainerRef;

  constructor(private invoker: ActionInvocationService,
    private componentFactory: ComponentFactoryService,
    private session: SessionService,
    private container: ViewContainerRef,
    private iconRegistry: MatIconRegistry,
    private activatedRoute: ActivatedRoute,
    sanitizer: DomSanitizer,
    private objectStore: ObjectStoreService,
    private metamodel: MetamodelService) {

    iconRegistry.addSvgIconSet(sanitizer.bypassSecurityTrustResourceUrl('./assets/mdi.svg'));


    // action params needed
    invoker.actionParamsNeeded.subscribe(args => {

      const dialog = this.componentFactory.createComponent(
        args.Canvas,
        DialogComponent, { 'args': args }) as ComponentRef<DialogComponent>;

      dialog.instance.onParamtersCollected.subscribe(data => {
        this.invoker.invokeAction(args.ObjectAction, args.ActionDescriptor, null, data);
      });

    });
  }

  // getDesktopDimensions() {
  //   const top = this._desktop.element.nativeElement.offsetTop;
  //   const bottom = this._footer.element.nativeElement.offsetTop;
  //   const left = this._desktop.element.nativeElement.offsetLeft;

  //   return {top: top, height: bottom - top, left: left };
  // }

  ngAfterContentInit(): void {
    // this.session.DesktopSize = this.getDesktopDimensions();

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
