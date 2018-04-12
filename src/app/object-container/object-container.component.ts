import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MetamodelService } from '../services/metamodel.service';
import { MatDialog } from '@angular/material';
import { ObjectComponent } from '../object/object.component';
import { ListComponent } from '../list/list.component';
import { SessionService } from '../services/session.service';

@Component({
  templateUrl: './object-container.component.html',
  styleUrls: ['./object-container.component.css']
})
export class ObjectContainerComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private metamodel: MetamodelService,
    private dialog: MatDialog,
    private injector: Injector,
    private session: SessionService) { }

  ngOnInit() {
    const data: any = this.injector.get('data');
        console.log(data);
        this.openModal(data);
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
     setTimeout(() => {
       this.session.IncrementOverlays();
        const windowRef =
            this.dialog.open(
              ListComponent, {data: {args: data}, width: '900px', });

            windowRef.afterClosed().subscribe(result => {
              this.session.DecrementOverlays();
              console.log("closing obejct container");
              console.log('object closed');
            });
      });
  }
}
