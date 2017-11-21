import { Component, OnInit, Input } from '@angular/core';
import { IResourceLink } from '../models/ro/iresource-link';
import { MetamodelService } from '../services/metamodel.service';
import { IResource } from '../models/ro/iresource';

@Component({
  selector: 'app-menu-action',
  templateUrl: './menu-action.component.html',
  styleUrls: ['./menu-action.component.css']
})
export class MenuActionComponent implements OnInit {

  @Input()
  ResourceDescriptor: IResource;
  FullResource: any;
  friendlyName: string;

  constructor(private metamodel: MetamodelService) { }

  ngOnInit() {
    // get action resource
    this.metamodel.getDetails(this.ResourceDescriptor).subscribe(data => {
      this.FullResource = data;
      // get description
      this.metamodel.getDescribedBy(this.FullResource).subscribe(action => {
        this.friendlyName = (<IResource>action).extensions.friendlyName;
      });
    });
}

    // todo: move to injected Icons svc
    styleIcons(text: string) {
      return 'fa fa-fw ' + this.findFaClass(text) + ' fontAwesomeIcon';
   }

   findFaClass(text: string): string {
       if (!text) {
           return '';
       }

        const cssClassFaPatterns = {
           'also.*': 'fa-file-o',
           'add.*': 'fa-plus-square',
           'remove.*': 'fa-minus-square',
           'update.*': 'fa-edit',
           'edit.*': 'fa-edit',
           'change.*': 'fa-edit',
           'delete.*': 'fa-trash',
           'move.*': 'fa-exchange',
           'first.*': 'fa-star',
           'find.*': 'fa-search',
           'lookup.*': 'fa-search',
           'clear.*': 'fa-remove',
           'previous.*': 'fa-step-backward',
           'next.*': 'fa-step-forward',
           'list.*': 'fa-list',
           'all.*': 'fa-list',
           'download.*': 'fa-download',
           'upload.*': 'fa-upload',
           'execute.*': 'fa-bolt',
           'run.*': 'fa-bolt',
           'calculate.*': 'fa-calculator',
           'verify.*': 'fa-check-circle',
           'refresh.*': 'fa-refresh',
            'install.*': 'fa-wrench',
        };

        const keys = Object.keys(cssClassFaPatterns);
        for (let i = 0; i < keys.length; i++) {
            const key: string = keys[i];
          if (text.toLowerCase().match(key)) {
              return cssClassFaPatterns[key];
          }
        }
        return '';
   }


}
