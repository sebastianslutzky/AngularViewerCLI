import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MetamodelService } from '../services/metamodel.service';
import { MatDialog } from '@angular/material';
import { ObjectComponent } from '../object/object.component';

@Component({
  templateUrl: './object-container.component.html',
  styleUrls: ['./object-container.component.css']
})
export class ObjectContainerComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private metamodel: MetamodelService,
    private dialog: MatDialog) { }

  ngOnInit() {
    console.log('at object component');
    this.route.params.subscribe(params => {
      const rawUrl = params['url'];
      const objectUrl =  decodeURIComponent(rawUrl);
      this.metamodel.getUrl(objectUrl).subscribe(data => {
        console.log(data);
        this.openModal(data);
        //pass data cast into a resource?
        // remove this once popup is closed
      });
    });
  }

  openModal(data) {
    const windowRef = this.dialog.open(ObjectComponent, {data: {args: data}});
    windowRef.afterClosed().subscribe(result => {
      console.log('object closed');
    });
  }
}
