import { Component, OnInit, Input, ViewRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MetamodelService } from '../services/metamodel.service';
import { ObjectMember, ActionDescription, ObjectAction } from '../models/ro/iresource';
import { ActionInvocationService } from '../services/action-invocation.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {
  private _objectActionLink: ObjectMember;
  @Input()
  set Action(val: ObjectMember) {
    if (!val) {
      throw new Error('Action member cannot be null');
    }
    this._objectActionLink = val;
  }

  private _actionDescriptor: ActionDescription;
  private _actionInstance: ObjectMember;

  Name: string;
  ToolTipText: string;
  ReasonDisabled: string ;
  isDisabled: boolean ;

  constructor(private metamodel: MetamodelService, private invoker: ActionInvocationService) {
    this.isDisabled = false;
    this.ReasonDisabled = '';
   }

public InvokeAction() {
  const actionLink = this._objectActionLink.links[0].href;

  this.metamodel.loadLink(ObjectAction, this._objectActionLink.links[0]).then(
    objectAction => {
      this.invoker.invokeAction(objectAction, this._actionDescriptor);
    });
}
  ngOnInit() {
     this.metamodel.getDetails<ObjectMember>(this._objectActionLink)
     .then(actionInstance => {
        this._actionInstance = actionInstance;
        this.metamodel.getDescribedBy(ActionDescription, actionInstance).then(
          actionDescriptor => {
            this._actionDescriptor = actionDescriptor;
            this.Name = actionDescriptor.friendlyName;
            this.ToolTipText = this._actionDescriptor.indexableKey;
          });
      });
  }
}
