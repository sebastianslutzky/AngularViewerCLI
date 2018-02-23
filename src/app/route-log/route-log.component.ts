import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-route-log',
  templateUrl: './route-log.component.html',
  styleUrls: ['./route-log.component.css']
})
export class RouteLogComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    console.log('at RouteLocComponetn');
   }

  ngOnInit() {
    console.log('at RouteLocComponetn init');

    this.route.paramMap.subscribe(data => {
      console.log('algo nuevo');
      console.log(decodeURIComponent(data.get('destination')));
    });

  }

}
