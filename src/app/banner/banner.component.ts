import { Component, OnInit, ViewChild } from '@angular/core';
import { MetamodelService } from '../services/metamodel.service';
import {Observable} from 'rxjs/Observable';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { IResourceListItem } from '../models/ro/iresource-list-item';
import { forEach } from '@angular/router/src/utils/collection';
import { IResourceLink } from '../models/ro/iresource-link';
import { IResource } from '../models/ro/iresource';
declare var $: any;

// RO Resource: Services
// Children: menubarcomponent (x 3)
// Argument .addSection(section)

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  @ViewChild('primaryMenu') private primaryMenu: MenuBarComponent;
  @ViewChild('secondaryMenu') private secondaryMenu: MenuBarComponent;
  @ViewChild('tertiaryMenu') private tertiaryMenu: MenuBarComponent;

  menus = {};

  constructor(private metamodel: MetamodelService) {
  }

  ngOnInit() {
    this.menus['PRIMARY'] = this.primaryMenu;
    this.menus['SECONDARY'] = this.secondaryMenu;
    this.menus['TERTIARY'] = this.tertiaryMenu;

    this.SetAppName();
    this.PopulateMenuBars();
  }

  private SetAppName() {
    // TODO: get from config
    $('title').text('Home Page');
  }

  PopulateMenuBars(): void {
    this.metamodel.getServices().subscribe(data =>
      this.AddSections(data.value)
    );
    // later, choose right menu based on index
  }

  private AddSections(services: IResourceListItem[]) {
    for (const service of services){
      this.AddSectionToRightMenuBar(service);
    }
 }

 private AddSectionToRightMenuBar(serviceDescr: IResourceLink) {
    this.metamodel.get(serviceDescr).subscribe(data => {
      const serviceEntity = <IResource> data;
      const menuBar = <MenuBarComponent>this.menus[serviceEntity.extensions.menuBar];

      if (this.isNotEmpty(serviceEntity)) {
        menuBar.addSection(serviceEntity);
      }
    });
 }

 isNotEmpty(serviceEntity: IResource): boolean {
   const actions = Object.keys(serviceEntity.members).map(
     function(k) {return serviceEntity.members[k]; });

    return actions.length > 0;
 }
}
