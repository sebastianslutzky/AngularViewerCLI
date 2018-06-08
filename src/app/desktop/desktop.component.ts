import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

@Component({
  selector: 'app-desktop',
  templateUrl: './desktop.component.html',
  styleUrls: ['./desktop.component.css']
})
export class DesktopComponent implements OnInit {

  @Output()
  onDekstopDimensionsChanged: EventEmitter<DesktopDimensions> = new EventEmitter<DesktopDimensions>();
  private _desktopItems: Promise<Array<any>>;

  constructor(private session: SessionService, private elRef: ElementRef) { }

  ngOnInit() {
    this.onDekstopDimensionsChanged.emit({left: '1px', top: '1px', width: '300px', height: '200px'});
    this._desktopItems =  this.session.getUniverseItems();
    this.session.onUniverseChanged.subscribe(()=> this._desktopItems = this.session.getUniverseItems());
  }
}

export interface DesktopDimensions {
  left: string;
  top: string;
  width: string;
  height: string;
}
