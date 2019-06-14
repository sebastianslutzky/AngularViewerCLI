import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-route-log',
  templateUrl: './route-log.component.html',
  styleUrls: ['./route-log.component.css']
})
export class RouteLogComponent implements OnInit {

  constructor(private route: ActivatedRoute) {

   }

  ngOnInit() {

    this.route.paramMap.subscribe(data => {
      console.log(decodeURIComponent(data.get('destination')));
    });

  }

}
