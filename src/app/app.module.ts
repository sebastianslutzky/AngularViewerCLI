import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { BannerComponent } from './banner/banner.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { MenuBarSectionComponent } from './menu-bar-section/menu-bar-section.component';
import { MenuActionComponent } from './menu-action/menu-action.component';
import { HttpClientWithAuthService } from './services/http-client-with-auth.service';
import { MetamodelService } from './services/metamodel.service';
import { Http, HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    BannerComponent,
    MenuBarComponent,
    MenuBarSectionComponent,
    MenuActionComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [HttpClientWithAuthService, MetamodelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
