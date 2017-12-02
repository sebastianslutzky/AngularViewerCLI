import { Component, OnInit, Input } from '@angular/core';
import { IMenuBarSectionLoaded } from '../menu-bar-section/imenu-bar-section-loaded';
import { MetamodelService } from '../services/metamodel.service';
import { Resource } from '../models/ro/iresource';

// loads resource: none
// children: section
// additional behaviour: removes sections that turn up empty

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {
  sections: Array<Resource> = [];
  @Input()
  title: string;

  isLast(index: number): boolean {
    return index === this.sections.length - 1;
  }

  addSection(section: Resource): any {
    this.sections.push(section);
  }

  handleMenuSectionLoaded(event: IMenuBarSectionLoaded, sectionIndex: number) {
    if (event.numberOfActions === 0) {
      this.sections.splice(sectionIndex, 1);
    }
  }
}
