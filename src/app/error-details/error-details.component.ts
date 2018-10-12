import { Component, OnInit, Inject, SecurityContext, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-error-details',
  templateUrl: './error-details.component.html',
  styleUrls: ['./error-details.component.css']
})
export class ErrorDetailsComponent implements OnInit {

  private error: string;

  @Output()
  get ErrorDescription(): string{
    return this.error;
  }

  constructor(sanitizer: DomSanitizer, @Inject(MAT_DIALOG_DATA) public data: any) {
    const raw = data.error.message;
    this.error = this.clean(raw);
  }

  private clean(raw: string) {
    raw = raw.replace(/(?:\r\n\r\n|\r\r|\n\n)/g, '</p><p>');
    return '<p>' + raw.replace(/(?:\r\n|\r|\n)/g, '<br>') + '</p>';
   }


  ngOnInit() {
    this.error = this.data.error.message;
  }

}


