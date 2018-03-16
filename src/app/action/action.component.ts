import { Component, OnInit, Input } from '@angular/core';
import { MetamodelService } from '../services/metamodel.service';
import { ObjectMember, ActionDescription } from '../models/ro/iresource';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.css']
})
export class ActionComponent implements OnInit {
  private _action: ObjectMember;
  @Input()
  set Action(val: ObjectMember) {
    this._action = val;
  }

  private _actionDescriptor: ActionDescription;
  private _actionInstance: ObjectMember;
  Name: string;
  ReasonDisabled: string ;
  isDisabled: boolean ;

  constructor(private metamodel: MetamodelService) {
    this.isDisabled = false;
    this.ReasonDisabled = '';
   }

public InvokeAction() {
  console.log('invoking action');
  console.log(this._actionDescriptor);
  console.log(this._actionInstance);
}
  ngOnInit() {
    this.metamodel.getDetails<ObjectMember>(this._action).subscribe(
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
