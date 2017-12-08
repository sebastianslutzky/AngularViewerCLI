import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { ComponentFactoryService } from '../services/component-factory.service';
import { ActionDescription } from '../models/ro/iresource';
import { ActionParametersNeededArgs } from '../services/iactioninvoked';

@Component({
  selector: 'app-dialog-container',
  templateUrl: './dialog-container.component.html',
  styleUrls: ['./dialog-container.component.css']
})
export class DialogContainerComponent implements OnInit {

  get actionName(): string{
    return this.action.extensions.friendlyName;
  }

  private action: ActionDescription;

  constructor(private factory: ComponentFactoryService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.action = data.args as ActionDescription;
   }

  ngOnInit() {
  }
 }
