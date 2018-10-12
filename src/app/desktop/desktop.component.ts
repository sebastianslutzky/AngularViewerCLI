import { Component, OnInit, ElementRef, Output, EventEmitter, ErrorHandler } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import { MatSnackBar, MatDialog } from '@angular/material';
import { GlobalErrorHandlerService } from '../global-error-handler.service';
import { ErrorDetailsComponent } from '../error-details/error-details.component';
import { ActionInvocationService } from '../services/action-invocation.service';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit {

  @Output()
  onDekstopDimensionsChanged: EventEmitter<DesktopDimensions> = new EventEmitter<DesktopDimensions>();
  private _desktopItems: Promise<Array<any>>;

  constructor(private session: SessionService,
    private elRef: ElementRef,
    public snackBar: MatSnackBar,
    private errorHandler: ErrorHandler,
    private errorDetailsDialog: MatDialog,
    private invoker: ActionInvocationService) {
      const globalErrorHandler = this.errorHandler as GlobalErrorHandlerService;
      globalErrorHandler.unhandledErrorOccured.subscribe(error  => this.showError(error));
      invoker.validationErrorOccured.subscribe(reason => this.showValidationError(reason));
     }

     private showError(error: Error) {
       const snackBarRef = this.snackBar.open('Error Occured', 'Details', {duration: 2000});
        snackBarRef.onAction().subscribe(() => {
          const detailsRef = this.errorDetailsDialog.open(ErrorDetailsComponent, {data: { error: error}});
        });
     }

     private showValidationError(validationError: string) {
       const snackBarRef = this.snackBar.open('Validation Error', validationError, {duration: 2000});
     }
  ngOnInit() {
    this.onDekstopDimensionsChanged.emit({left: '1px', top: '1px', width: '300px', height: '200px'});
    this._desktopItems =  this.session.getUniverseItems();
    this.session.onUniverseChanged.subscribe(() => this._desktopItems = this.session.getUniverseItems());
  }

}

export interface DesktopDimensions {
  left: string;
  top: string;
  width: string;
  height: string;
}
