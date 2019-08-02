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

  HasResults: boolean;

  public Columns(): string[]  {
    if (this.HasResults) {
      const sampleRow = this.Context.ExtendedResult[0];
      return Object.keys(sampleRow).filter(x => !x.startsWith('$$'));
    }
    return null;
  }
  constructor(private metamodel: MetamodelService, private router: Router ) {
   }

  ngOnInit() {
    this.HasResults = this.Context
    && this.Context.ExtendedResult
    && this.Context.ExtendedResult.length > 0;
  }


  goTo(selectedElement) {
    this.router.navigate([this.getObjectUrl(selectedElement)]);
  }

  getObjectUrl(element: IXActionResultListItem) {
    return 'object/' + encodeURIComponent(element.$$href);
  }

  translateObjectUrl(url: string){
    return this.metamodel.convertToViewerResource(url);
  }

}
