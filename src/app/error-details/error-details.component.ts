import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-error-details',
  templateUrl: './error-details.component.html',
  styleUrls: ['./error-details.component.css']
})
export class ErrorDetailsComponent implements OnInit {

  private error: Error;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.error = data.error as Error;
   }

  ngOnInit() {
  }

}
