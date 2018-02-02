import { Component, OnInit, Inject } from '@angular/core';
import { ComponentFactoryService } from '../services/component-factory.service';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css']
})
export class ObjectComponent implements OnInit {

  private objectData: any;

  private title: string;

  constructor(private factory: ComponentFactoryService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.objectData = data.args;

    this.title = this.objectData.title;
    console.log('object data:');
    console.log(this.objectData);
   }

  ngOnInit() {
  }

}
