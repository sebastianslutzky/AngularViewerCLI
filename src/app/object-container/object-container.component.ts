import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MetamodelService } from '../services/metamodel.service';
import { MatDialog } from '@angular/material';
import { ObjectComponent } from '../object/object.component';
import { ListComponent } from '../list/list.component';

@Component({
  templateUrl: './object-container.component.html',
  styleUrls: ['./object-container.component.css']
})
export class ObjectContainerComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private metamodel: MetamodelService,
    private dialog: MatDialog,
    private injector: Injector) { }

  ngOnInit() {
    const data: any = this.injector.get('data');
        console.log(data);
        this.openModal(data);
        console.log('done, returning from object container component');
        return;

        // NOT EXECUTED
        /*
    console.log('at object component');
    this.route.params.subscribe(params => {
      const rawUrl = params['url'];
      const objectUrl =  decodeURIComponent(rawUrl);
      this.metamodel.getUrl(objectUrl).subscribe(data1 => {
        console.log(data1);
        this.openModal(data1);
        //pass data cast into a resource?
        // remove this once popup is closed
      });
    });
      */
  }

  openModal(data) {
    const windowRef = this.dialog.open(ListComponent, {data: {args: data}, width: '900px', });
    windowRef.afterClosed().subscribe(result => {
      console.log('object closed');
    });
  }
}
