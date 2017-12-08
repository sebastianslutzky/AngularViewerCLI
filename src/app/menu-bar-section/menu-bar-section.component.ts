import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MetamodelService } from '../services/metamodel.service';
import { ResourceLink } from '../models/ro/iresource-link';
import { IMenuBarSectionLoaded } from './imenu-bar-section-loaded';
import { log } from 'util';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientWithAuthService } from '../services/http-client-with-auth.service';
import { Resource } from '../models/ro/iresource';

// loads a menu resource that will result in a section of the aggregation of menus
// provided this section is not empty

@Component({
  selector: 'app-menu-bar-section',
  templateUrl: './menu-bar-section.component.html',
  styleUrls: ['./menu-bar-section.component.css']
})
export class MenuBarSectionComponent implements OnInit {

  @Input()
  ResourceDescriptor: Resource;
  @Input()
  NoDivision: boolean;
  @Output()
  onMenuSectionLoaded: EventEmitter<IMenuBarSectionLoaded> = new EventEmitter();
  actions: Array<ResourceLink>= [];


  constructor(private metamodel: MetamodelService, private client: HttpClientWithAuthService) { }

  ngOnInit() {
    const descr = <any>this.ResourceDescriptor;
    const members = Object.keys(descr.members).map(function(k) {return descr.members[k]; });
    this.actions = <ResourceLink[]> members;
  }
}
