import { Component, OnInit, ViewChild } from '@angular/core';
import { MetamodelService } from '../services/metamodel.service';
import {Observable} from 'rxjs/Observable';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { IResourceListItem } from '../models/ro/iresource-list-item';
import { forEach } from '@angular/router/src/utils/collection';
import { IResourceLink } from '../models/ro/iresource-link';
declare var $: any;

//RO Resource: Services
//Children: menubarcomponent (x 3)
//Argument .addSection(section)

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  @ViewChild('primaryMenu') private _primaryMenu: MenuBarComponent;

  constructor(private metamodel: MetamodelService) {
  }

  ngOnInit() {
    this.SetAppName();
    this.PopulateMenuBars();
  }

  private SetAppName() {
    //TODO: get from config
    $('title').text('Home Page');
  }

  PopulateMenuBars(): void {
    this.metamodel.getServices().subscribe(data =>
      this.AddSections(data.value)
    );
    //get resources
    // for each of them, if not empty, add as a section in primary
    //later, choose right menu based on index
  }

  private AddSections(services: IResourceListItem[]) {
    for (const service of services){
      this._primaryMenu.addSection(service);
    }
      //  for(var service of services)
      //  {
      //    this.metamodel.get(service).subscribe(data=>{
      //      let actionArray = Object.keys(data.members).map(function(k) {return data.members[k]});
      //      if(actionArray.length > 1){
      //       console.log(data)
      //         this._primaryMenu.addSection(data)
      //      }
      //    })
      //  }

       // select where it goes (not at first)
 }
}
