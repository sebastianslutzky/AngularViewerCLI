import { Component, OnInit, ViewChild } from '@angular/core';
import { MetamodelService } from '../services/metamodel.service';
import {Observable} from 'rxjs/Observable';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { forEach } from '@angular/router/src/utils/collection';
import { IResourceLink } from '../models/ro/iresource-link';
import { Resource, ReprType, ActionResult, ReprTypesList } from '../models/ro/iresource';
import {MatMenuModule} from '@angular/material/menu';
import { environment } from '../../environments/environment';
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
  userName: string;
  applicationName: string;

  constructor(private metamodel: MetamodelService) { }

  ngOnInit() {
    this.applicationName = environment.applicationName;
    this.menus['PRIMARY'] = this.primaryMenu;
    this.menus['SECONDARY'] = this.secondaryMenu;
    this.menus['TERTIARY'] = this.tertiaryMenu;

    this.SetAppName();
  this.SetUserName();
    this.PopulateMenuBars();
  }

  private SetAppName() {
    // TODO: get from config
    $('title').text('Home Page');
   }

  private SetUserName() {
    // TODO: move to ProfileService
    const meUrl = this.metamodel.buildUrl('services/isissecurity.MeService/actions/me/invoke');
    this.metamodel.load<ActionResult>(meUrl).subscribe(data => {
      this.userName =  data.result.title;
      this.tertiaryMenu.title = this.getTertiartyHeader();
    });
  }

  PopulateMenuBars(): void {
    this.getServices().subscribe(data =>
      this.AddSections(data.value)
    );
  }

  private AddSections(services: ReprType[]) {
    for (const service of services){
      this.AddSectionToRightMenuBar(service);
    }
 }

 private AddSectionToRightMenuBar(serviceDescr: ReprType) {
    this.metamodel.loadLink<Resource>(serviceDescr).subscribe(serviceEntity => {
      const menuBar = <MenuBarComponent>this.menus[serviceEntity.extensions.menuBar];

      if (this.isNotEmpty(serviceEntity)) {
        menuBar.addSection(serviceEntity);
        if (!menuBar.title) {
          menuBar.title = serviceEntity.title;
        }
      }
    });
 }

 isNotEmpty(serviceEntity: Resource): boolean {
   const actions = Object.keys(serviceEntity.members).map(
     function(k) {return serviceEntity.members[k]; });

    return actions.length > 0;
 }

// todo: use userprofile service if present
// https://trello.com/c/i0bTNecz/25-try-to-use-userprofileservice-if-it-exist
  getTertiartyHeader(): string {
    return 'Hi ' + this.userName + '!';
  }

  public getServices(): Observable<ReprTypesList> {
    const servicesHRef =  this.metamodel.buildUrl('services');
    return this.metamodel.load<ReprTypesList>(servicesHRef, true);
   }
}
