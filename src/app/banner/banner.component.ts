import { Component, OnInit, ViewChild } from '@angular/core';
import { MetamodelService } from '../services/metamodel.service';
import {Observable} from 'rxjs/Observable';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { forEach } from '@angular/router/src/utils/collection';
import { Resource, ReprType, ActionResult, ReprTypesList } from '../models/ro/iresource';
import {MatMenuModule} from '@angular/material/menu';
import { environment } from '../../environments/environment';
import { Element } from '@angular/compiler';
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

    this.SetUserName();
    this.PopulateMenuBars();
  }

  private SetUserName() {
    // TODO: move to ProfileService
    const meUrl = this.metamodel.buildUrl('services/isissecurity.MeService/actions/me/invoke');
    this.metamodel.load(ActionResult, meUrl).then(data => {
      this.userName =  data.result.title;
      this.tertiaryMenu.title = this.getTertiartyHeader();
    }).catch( r => console.log (r));
  }

  PopulateMenuBars(): void {
    this.getServices().then(data =>
      this.AddSections(data.value)
    ).catch( r => console.log(r));
  }

  private AddSections(services: ReprType[]) {
    for (const service of services){
      this.AddSectionToRightMenuBar(service);
    }
 }

 private async AddSectionToRightMenuBar(serviceDescr: ReprType) {
   // TODO: use an additional api where it passes it cache spec object (i.e. cache)
   // it specifies the name for now, but it will include an expiry date too
    const prom = this.metamodel.loadLink(Resource, serviceDescr).then(  serviceEntity => {
      const menuBar = <MenuBarComponent>this.menus[serviceEntity.extensions.menuBar];

      if (this.isNotEmpty(serviceEntity)) {
        menuBar.addSection(serviceEntity);
        if (!menuBar.title) {
          menuBar.title = serviceEntity.title;
        }
      }
    });

    await prom;
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

  public async getServices(): Promise<ReprTypesList> {
    const servicesHRef =  this.metamodel.buildUrl('services');
    const loaded =  this.metamodel.load(ReprTypesList, servicesHRef, true);
    return loaded;
   }
}
