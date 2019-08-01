import { Component, OnInit, Input } from '@angular/core';
import { MetamodelService } from '../services/metamodel.service';
import { IXActionResultListItem } from '../models/ro/xaction-result-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-action-result',
  templateUrl: './list-action-result.component.html',
  styleUrls: ['./list-action-result.component.css']
})
export class ListActionResultComponent implements OnInit {
  @Input()
  Context: any;
  constructor(private metamodel: MetamodelService, private router: Router ) {
   }

  ngOnInit() {
    console.log(this.Context);
  }


  goTo(selectedElement) {
    this.router.navigate([this.getObjectUrl(selectedElement)]);
  }

  getObjectUrl(element: IXActionResultListItem) {
    return  'object/' + encodeURIComponent(this.metamodel.convertFromResourceUrl(element.$$href));
  }

  translateObjectUrl(url: string){
    return this.metamodel.convertFromResourceUrl(url);
  }

}
