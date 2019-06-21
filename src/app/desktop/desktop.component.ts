import { Component, OnInit, ElementRef, Output, EventEmitter, ErrorHandler } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { MatSnackBar, MatDialog } from '@angular/material';
import { GlobalErrorHandlerService } from '../global-error-handler.service';
import { ErrorDetailsComponent } from '../error-details/error-details.component';
import { ActionInvocationService } from '../services/action-invocation.service';
import { ActionDescription } from '../models/ro/iresource';
import { MetamodelService } from '../services/metamodel.service';
import { ObjectLoadedPublisherService } from '../object-loaded-publisher.service';
import { ObjectLayout } from '../services/layout.service';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit {

  @Output()
  onDekstopDimensionsChanged: EventEmitter<DesktopDimensions> = new EventEmitter<DesktopDimensions>();
  private _desktopItems: Promise<Array<any>>;
  _focusObject: any;
  _focusObjectType: string;
  ObjectLayout: ObjectLayout;
  private set FocusObject(value: any){
   this._focusObject = value;
   // action results displayed without routiin
   if (value.ActionDescriptor) {
   const descr = value.ActionDescriptor as ActionDescription;
   const returnType =  this.metamodel.getReturnType(descr);
   this._focusObjectType = returnType.href;
   } else {
     this._focusObjectType = 'unknown';
   }
  }

  private get FocusObject(): any{
    return this._focusObject;
  }

  // TODO: change the condition and check some value common to lists and objects
  private get IsFocusObjectAList(){
    if (!this._focusObjectType || this._focusObjectType === 'unknown') {
      return false;
    }
    return   this._focusObjectType.endsWith('java.util.List');
  }

  private get IsFocusObjectAnObject(){
    if (this.IsFocusObjectAList || !this.FocusObject) {
      return false;
    }

    return this.FocusObject.constructor.name === 'ObjectRepr';
  }
    
  constructor(private session: SessionService,
    private elRef: ElementRef,
    public snackBar: MatSnackBar,
    private errorHandler: ErrorHandler,
    private errorDetailsDialog: MatDialog,
    private metamodel: MetamodelService,
    private objectLoadedPublisher: ObjectLoadedPublisherService,
    private invoker: ActionInvocationService) {
      const globalErrorHandler = this.errorHandler as GlobalErrorHandlerService;
      invoker.validationErrorOccured.subscribe(reason => this.showValidationError(reason));
      

    invoker.actionInvoked.subscribe(data => {
      if (data.ActionDescriptor.IsForCollection) {
        return;
      }
       this.FocusObject = data;
    });

    objectLoadedPublisher.objectLoaded.subscribe(args => {
      this.FocusObject = args.resource;
      this.ObjectLayout = args.layout;
    })
     }


     private showValidationError(validationError: string) {
       const snackBarRef = this.snackBar.open('Validation Error', validationError, {duration: 2000});
     }
  ngOnInit() {

    // this.onDekstopDimensionsChanged.emit({left: '1px', top: '1px', width: '300px', height: '200px'});
    // this._desktopItems =  this.session.getUniverseItems();
    // this.session.onUniverseChanged.subscribe(() => this._desktopItems = this.session.getUniverseItems());
  }

}

export interface DesktopDimensions {
  left: string;
  top: string;
  width: string;
  height: string;
}
