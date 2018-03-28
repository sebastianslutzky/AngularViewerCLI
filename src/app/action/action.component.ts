import { Component, OnInit, Input } from '@angular/core';
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
    this._objectActionLink = val;
  }

  private _actionDescriptor: ActionDescription;
  private _actionInstance: ObjectMember;
  Name: string;
  ReasonDisabled: string ;
  isDisabled: boolean ;

  constructor(private metamodel: MetamodelService,private invoker: ActionInvocationService) {
    this.isDisabled = false;
    this.ReasonDisabled = '';
   }

public InvokeAction() {
  const actionLink = this._objectActionLink.links[0].href;

  this.metamodel.loadLink(ObjectAction, this._objectActionLink.links[0]).subscribe(
    objectAction => {
      this.invoker.invokeAction(objectAction, this._actionDescriptor);
    });
}
  ngOnInit() {
    this.metamodel.getDetails<ObjectMember>(this._objectActionLink).subscribe(
      actionInstance => {
        this._actionInstance = actionInstance;
        this.metamodel.getDescribedBy(ActionDescription, actionInstance).subscribe(
          actionDescriptor => {
            this._actionDescriptor = actionDescriptor;
            this.Name = actionDescriptor.friendlyName;
          });
      }
    );
  }
}
