import { Component, OnInit, Input, ViewContainerRef } from '@angular/core';
import { MetamodelService } from '../services/metamodel.service';
import {  Resource, Action, ActionDescription, ObjectAction } from '../models/ro/iresource';
import { ActionInvocationService } from '../services/action-invocation.service';

@Component({
  selector: 'app-menu-action',
  templateUrl: './menu-action.component.html',
  styleUrls: ['./menu-action.component.css']
})
export class MenuActionComponent implements OnInit {
  actionDescribedBy: ActionDescription;
  tooltip: string;

  @Input()
  ActionLink: Resource;
  Action: ObjectAction;
  get friendlyName(): string {
    return this.actionDescribedBy && this.actionDescribedBy.extensions.friendlyName || '';
  }

  constructor(private metamodel: MetamodelService, private invoker: ActionInvocationService) { }

  ngOnInit() {
    // get action resource
    this.metamodel.getDetails<ObjectAction>(this.ActionLink).subscribe(data => {
      this.Action = data;
      // get description
      this.metamodel.getDescribedBy(ActionDescription, this.Action).subscribe(action => {
        this.actionDescribedBy = action;

        const up =  this.metamodel.getFromRel(action, 'self') ;
        this.tooltip = up.href;
      });
    });
}

public InvokeAction() {
  this.invoker.invokeAction(this.Action, this.actionDescribedBy);
}

    // todo: move to injected Icons svc
    styleIcons(text: string) {
      return 'fa fa-fw ' + this.findFaClass(text) + ' fontAwesomeIcon';
   }

   findFaClass(text: string): string {
       if (!text) {
           return '';
       }

        const cssClassFaPatterns = {
           'also.*': 'fa-file-o',
           'add.*': 'fa-plus-square',
           'remove.*': 'fa-minus-square',
           'update.*': 'fa-edit',
           'edit.*': 'fa-edit',
           'change.*': 'fa-edit',
           'delete.*': 'fa-trash',
           'move.*': 'fa-exchange',
           'first.*': 'fa-star',
           'find.*': 'fa-search',
           'lookup.*': 'fa-search',
           'clear.*': 'fa-remove',
           'previous.*': 'fa-step-backward',
           'next.*': 'fa-step-forward',
           'list.*': 'fa-list',
           'all.*': 'fa-list',
           'download.*': 'fa-download',
           'upload.*': 'fa-upload',
           'execute.*': 'fa-bolt',
           'run.*': 'fa-bolt',
           'calculate.*': 'fa-calculator',
           'verify.*': 'fa-check-circle',
           'refresh.*': 'fa-refresh',
            'install.*': 'fa-wrench',
        };

        const keys = Object.keys(cssClassFaPatterns);
        for (let i = 0; i < keys.length; i++) {
            const key: string = keys[i];
          if (text.toLowerCase().match(key)) {
              return cssClassFaPatterns[key];
          }
        }
        return '';
   }


}
