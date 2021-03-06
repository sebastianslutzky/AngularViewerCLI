import { Component, OnInit, Input, ViewContainerRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { TextParamComponent, IValidatable } from '../text-param/text-param.component';
import { ComponentFactoryService } from '../services/component-factory.service';
import { MetamodelService } from '../services/metamodel.service';
import { ResourceLink, ParamDescription,  DomainType } from '../models/ro/iresource';
import { ParameterInfo } from '../services/iactioninvoked';
import { SessionService } from '../services/session.service';
import { ActionParameterCollection } from '../dialog/dialog.component';
import { ChoicesParamComponent } from '../choices-param/choices-param.component';

@Component({
  selector: 'app-action-param',
  templateUrl: './action-param.component.html',
  styleUrls: ['./action-param.component.css']
})
export class ActionParamComponent implements OnInit {

  @Input()
  Parameter: ParameterInfo;
  @Input()
  Context: any;
  @Input()
  Key: string;

  @Output()
  onBlur: EventEmitter<string> = new EventEmitter<string>();
  descriptor: ParamDescription;

 get friendlyName(): string {
  return this.descriptor.extensions.friendlyName;
 }

  constructor(private componentFactory: ComponentFactoryService, private container: ViewContainerRef,
     private metamodel: MetamodelService, private session: SessionService) { }

  ngOnInit() {
    this.metamodel.loadLink(ParamDescription, this.Parameter.typeLink).then(paramDescr => {
       this.descriptor = paramDescr;
       this.metamodel.loadReturnType(DomainType, paramDescr).then(returnType => {
           this.createConcreteComponent(returnType, this.Parameter);
        });
      });
  }

  createConcreteComponent(returnType: DomainType, paramDescr: ParameterInfo) {
       const view = this.renderInput(returnType.canonicalName, paramDescr);
       const input: any = this.componentFactory.createComponent(this.container, view,
            {'args': paramDescr,
            'ctx': this.Context,
          'key': this.Key});
        const v = (input.instance as IValidatable);
        v.onBlur.subscribe(x => {
          this.onBlur.emit(x);
          });
  }

  renderInput(propertyType: string, paramDescr: ParameterInfo): any {
    const hasChoices = paramDescr.instance.choices;
    if (hasChoices) {
      return ChoicesParamComponent;
    }
      switch (propertyType) {
        case 'java.lang.String':
        case 'long': {
          return TextParamComponent;
        }
        default: {
          throw Error('don\'t know how to render columns of type: ' + propertyType + '. Viewing as string');
        }
      }
  }
}

