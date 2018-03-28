import { Component, OnInit, Injector, EventEmitter, Output } from '@angular/core';
import { MetamodelService } from '../services/metamodel.service';
import { ComponentFactoryService } from '../services/component-factory.service';
import {MatDialog} from '@angular/material';
import { DialogContainerComponent, ParamInput } from '../dialog-container/dialog-container.component';
import { ActionParametersNeededArgs } from '../services/iactioninvoked';
import { ActionDescription, ObjectAction } from '../models/ro/iresource';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  private args: ActionParametersNeededArgs;
  @Output()
  onParamtersCollected: EventEmitter<ActionParameterCollection> = new EventEmitter();


  // this component could be reduced to just 1 static handler function that opens the dialog
  constructor(
    public dialog: MatDialog,
    public injector: Injector) {
       this.args = injector.get('args');
       this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContainerComponent, {
      data : {args: this.args}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const args = new ActionParameterCollection(result.params);
        this.onParamtersCollected.emit(args);
      }
    });
  }
}

export class ActionParameterCollection {
  constructor(public params: {[key: string]: ParamInput}) {}

  public asQueryString(): string {
   const params = Object.values(this.params).map(input => input.toQueryString());
   return params.join('&');
  }
}
