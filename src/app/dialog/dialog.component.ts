import { Component, OnInit, Injector } from '@angular/core';
import { MetamodelService } from '../services/metamodel.service';
import { ComponentFactoryService } from '../services/component-factory.service';
import {MatDialog} from '@angular/material';
import { DialogContainerComponent } from '../dialog-container/dialog-container.component';
import { ActionParametersNeededArgs } from '../services/iactioninvoked';
import { ActionDescription } from '../models/ro/iresource';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  private args: ActionDescription;


  // this component could be reduced to just 1 static handler function that opens the dialog
  constructor(
    public dialog: MatDialog,
    public injector: Injector) {
       this.args = injector.get('args');
        this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContainerComponent, {
      height: '350px',
      data : {args: this.args}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  ngOnInit() {
  }

}
