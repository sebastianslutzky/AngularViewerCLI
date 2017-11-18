import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MetamodelService } from '../services/metamodel.service';
import { IResourceLink } from '../models/ro/iresource-link';
import { IMenuBarSectionLoaded } from './imenu-bar-section-loaded';
import { log } from 'util';
import { HttpClient } from 'selenium-webdriver/http';
import { HttpClientWithAuthService } from '../services/http-client-with-auth.service';

//loads a menu resource that will result in a section of the aggregation of menus
// provided this section is not empty

@Component({
  selector: 'app-menu-bar-section',
  templateUrl: './menu-bar-section.component.html',
  styleUrls: ['./menu-bar-section.component.css']
})
export class MenuBarSectionComponent implements OnInit {

  @Input()
  ResourceDescriptor: IResourceLink;
  @Input()
  NoDivision: boolean;
  @Output()
  onMenuSectionLoaded: EventEmitter<IMenuBarSectionLoaded> = new EventEmitter();
  actions: Array<IResourceLink>= [];


  constructor(private metamodel: MetamodelService, private client: HttpClientWithAuthService) { }

  ngOnInit() {
    this.metamodel.get(this.ResourceDescriptor).subscribe(data =>
    {
        const members = data.members as IResourceLink[];
        const asArray = Object.keys(members).map(function(k) {return members[k]; });
        this.actions = asArray as IResourceLink[];
        const resourceLoaded: IMenuBarSectionLoaded = {
            numberOfActions: asArray.length
        };
        this.onMenuSectionLoaded.emit(resourceLoaded);
    });
  }
}
