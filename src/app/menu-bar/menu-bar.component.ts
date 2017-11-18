import { Component, OnInit, Input } from '@angular/core';
import { IResourceListItem } from '../models/ro/iresource-list-item';
import { IMenuBarSectionLoaded } from '../menu-bar-section/imenu-bar-section-loaded';
import { MetamodelService } from '../services/metamodel.service';
import { IResource } from '../models/ro/iresource';

// loads resource: none
// children: section
// additional behaviour: removes sections that turn up empty

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {
  sections: Array<IResource> = [];
  actionName: string;
  friendlyName: string;

  constructor() { }

  ngOnInit() {
  }

  isLast(index: number): boolean {
    return index === this.sections.length - 1;
  }

  addSection(section: IResource): any {
    this.sections.push(section);
  }

  @Input()
  set ActionName(actionName: string){
      this.actionName = actionName;
      this.friendlyName = actionName;
  }

  handleMenuSectionLoaded(event: IMenuBarSectionLoaded, sectionIndex: number) {
    if (event.numberOfActions === 0) {
      this.sections.splice(sectionIndex, 1);
    }
  }
}
