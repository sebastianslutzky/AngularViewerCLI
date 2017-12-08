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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatMenuModule,
         MatToolbarModule,
        MatListModule,
        MatTable,
        MatTableModule,
        MatExpansionModule,
        MatTooltipModule,
        MatCardModule,
        MatDialogModule,
        MatCheckboxModule,
        MatFormField,
        MatFormFieldModule,
        MatInputModule} from '@angular/material';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ActionInvocationService } from './services/action-invocation.service';
import { ListComponent} from './list/list.component';
import { ComponentFactory } from '@angular/core/src/linker/component_factory';
import { ComponentFactoryService } from './services/component-factory.service';
import { CellComponent } from './cell/cell.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { TextComponent } from './text/text.component';
import { FormsModule } from '@angular/forms';
import { ResourceFactoryService } from './services/resource-factory.service';
import { DialogComponent } from './dialog/dialog.component';
import { DialogContainerComponent } from './dialog-container/dialog-container.component';
import { ActionParamComponent } from './action-param/action-param.component';
import { TextParamComponent } from './text-param/text-param.component';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    BannerComponent,
    MenuBarComponent,
    MenuBarSectionComponent,
    MenuActionComponent,
    ListComponent,
    CellComponent,
    CheckboxComponent,
    TextComponent,
    DialogComponent,
    DialogContainerComponent,
    ActionParamComponent,
    TextParamComponent
  ],
  imports: [
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatExpansionModule,
    MatTooltipModule,
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    FormsModule
  ],
  providers: [HttpClientWithAuthService,
    MetamodelService,
    ActionInvocationService,
    ComponentFactoryService,
    ResourceFactoryService],
  bootstrap: [AppComponent],
  entryComponents: [
    ListComponent,
    TextComponent,
    TextParamComponent,
    CheckboxComponent,
    DialogComponent,
    DialogContainerComponent
  ]
})
export class AppModule { }
