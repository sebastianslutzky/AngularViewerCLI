import { Component, ElementRef, ViewContainerRef, ViewChild, OnInit, AfterContentInit } from '@angular/core';
import { ActionResult, ActionDescription } from './models/ro/iresource';
import { ActionInvocationService } from './services/action-invocation.service';
import { ComponentFactoryService } from './services/component-factory.service';
import { ListComponent } from './list/list.component';
import { DialogComponent } from './dialog/dialog.component';
import { ComponentRef } from '@angular/core/src/linker/component_factory';
import { SessionService } from './services/session.service';
import {ObjectContainerComponent} from './object-container/object-container.component';
import { MatIconRegistry, MatDrawer } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ObjectStoreService } from './services/object-store.service';
import { MetamodelService } from './services/metamodel.service';
import { ListActionResultComponent } from './list-action-result/list-action-result.component';
import { ActionParametersNeededArgs } from './services/iactioninvoked';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements AfterContentInit {

  ParametersNeededArgs:  ActionParametersNeededArgs;
  @ViewChild('banner', { read: ViewContainerRef }) private _banner: ViewContainerRef;
  @ViewChild('footer', { read: ViewContainerRef }) private _footer: ViewContainerRef;
  @ViewChild('drawerContainer', { read: ViewContainerRef }) private drawerContainer: ViewContainerRef;
  @ViewChild('drawerContent', { read: ViewContainerRef }) private drawerContent: ViewContainerRef;
  @ViewChild('drawer', { read: MatDrawer }) private drawer: MatDrawer;

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


    invoker.actionInvoked.subscribe(() => this.drawer.close());
    // action params needed
    invoker.actionParamsNeeded.subscribe(args => {
      this.ParametersNeededArgs = args;
      console.log(this.ParametersNeededArgs);
      this.drawer.open();
      // const dialog = this.componentFactory.createComponent(
      //   args.Canvas,
      //   DialogComponent, { 'args': args }) as ComponentRef<DialogComponent>;

      // dialog.instance.onParamtersCollected.subscribe(data => {
      //   this.invoker.invokeAction(args.ObjectAction, args.ActionDescriptor, null, data);
      // });

    });
  }

  // getDesktopDimensions() {
  //   const top = this._desktop.element.nativeElement.offsetTop;
  //   const bottom = this._footer.element.nativeElement.offsetTop;
  //   const left = this._desktop.element.nativeElement.offsetLeft;

  //   return {top: top, height: bottom - top, left: left };
  // }


  public CloseDrawer() {
    this.drawer.close();
  }

  ngAfterContentInit(): void {
    // this.session.DesktopSize = this.getDesktopDimensions();
    const t = this.drawerContainer.element.nativeElement.classList;
   // t.remove('mat-drawer-container');
    const t1 = this.drawerContent.element.nativeElement.classList;
    //t1.remove('mat-drawer-content');
  }
     // move to card, or ven better, to resource
     getFriendlyName(result): string {

      // if displayng the result of an action (lists)
      if (result.ActionDescriptor) {
        return result.ActionDescriptor.friendlyName;
      }

      return 'unknown';
    }
}
