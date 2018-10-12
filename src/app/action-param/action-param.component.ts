import { Component, OnInit, Input, ViewContainerRef, ViewChild } from '@angular/core';
import { TextParamComponent } from '../text-param/text-param.component';
import { ComponentFactoryService } from '../services/component-factory.service';
import { MetamodelService } from '../services/metamodel.service';
import { ResourceLink, ParamDescription,  DomainType } from '../models/ro/iresource';
import { ParameterInfo } from '../services/iactioninvoked';
import { SessionService } from '../services/session.service';
import { ActionParameterCollection } from '../dialog/dialog.component';

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
       const view = this.renderInput(returnType.canonicalName);
          this.componentFactory.createComponent(this.container, view,
            {'args': paramDescr,
            'ctx': this.Context,
          'key': this.Key});
  }

  renderInput(propertyType: string): any {
      switch (propertyType) {
        case 'java.lang.String': {
          return TextParamComponent;
        }
        default: {
          throw Error('don\'t know how to render columns of type: ' + propertyType + '. Viewing as string');
        }
      }
  }
}

