import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { BannerComponent } from './banner/banner.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { MenuBarSectionComponent } from './menu-bar-section/menu-bar-section.component';
import { MenuActionComponent } from './menu-action/menu-action.component';
import { HttpClientWithAuthService } from './services/http-client-with-auth.service';
import { MetamodelService } from './services/metamodel.service';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatMenuModule,
         MatToolbarModule,
        MatListModule,
        MatTableModule,
        MatExpansionModule,
        MatTooltipModule,
        MatCardModule,
        MatDialogModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatSidenavModule,
        MatGridListModule,
        MatButtonModule,
        MatGridList,
        MatIconModule,
        MatChipsModule,
        MatTabsModule,
        MatSnackBarModule} from '@angular/material';
import { ActionInvocationService } from './services/action-invocation.service';
import { ListComponent} from './list/list.component';
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
import { ObjectComponent } from './object/object.component';
import { ObjectContainerComponent } from './object-container/object-container.component';
import { SessionService } from './services/session.service';
import { ObjectRouterComponent } from './object-router/object-router.component';
import { RouteLogComponent } from './route-log/route-log.component';
import { PropertyComponent } from './property/property.component';
import { HttpClientModule } from '@angular/common/http';
import { ActionComponent } from './action/action.component';
import { MinimizedObjectComponent } from './minimized-object/minimized-object.component';
import { CollectionButtonComponent } from './collection-button/collection-button.component';
import { DesktopComponent } from './desktop/desktop.component';
import { LayoutService } from './services/layout.service';
import { PropertyGroupComponent } from './property-group/property-group.component';
import { ObjectStoreService } from './services/object-store.service';
import { CollectionTableComponent } from './collection-table/collection-table.component';
import { GlobalErrorHandlerService } from './global-error-handler.service';
import { ErrorDetailsComponent } from './error-details/error-details.component';
import { StringFieldComponent } from './string-field/string-field.component';
import { ObjectFieldComponentComponent } from './object-field-component/object-field-component.component';
import { ObjectViewRowComponent } from './object-view-row/object-view-row.component';
import { LayoutComponentFactoryService } from './layout-component-factory.service';
import { LayoutGridComponent } from './layout-grid/layout-grid.component';
import { LayoutRowComponent } from './layout-row/layout-row.component';
import { LayoutColumnComponent } from './layout-column.component';
import { BooleanFieldComponent } from './boolean-field/boolean-field.component';

@NgModule({
  exports: [MatGridList],
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
    TextParamComponent,
    ObjectComponent,
    ObjectContainerComponent,
    ObjectRouterComponent,
    RouteLogComponent,
    PropertyComponent,
    ActionComponent,
    MinimizedObjectComponent,
   CollectionButtonComponent,
    DesktopComponent,
    PropertyGroupComponent,
    CollectionTableComponent,
    ErrorDetailsComponent,
    StringFieldComponent,
    ObjectFieldComponentComponent,
    ObjectViewRowComponent,
    LayoutGridComponent,
    LayoutRowComponent,
    LayoutColumnComponent,
    BooleanFieldComponent
  ],
  imports: [
    HttpModule,
    HttpClientModule,
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
    MatTabsModule,
    MatSidenavModule,
    MatGridListModule,
    MatButtonModule,
    FormsModule,
    MatChipsModule,
     MatSnackBarModule
  ],
  providers: [HttpClientWithAuthService,
    MetamodelService,
    ActionInvocationService,
    ComponentFactoryService,
    ResourceFactoryService,
    LayoutService,
    SessionService,
  ObjectStoreService,
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService
    },
    LayoutComponentFactoryService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ListComponent,
    TextComponent,
    TextParamComponent,
    CheckboxComponent,
    DialogComponent,
    DialogContainerComponent,
    ObjectComponent,
    ObjectContainerComponent,
    ErrorDetailsComponent,
    StringFieldComponent,
    BooleanFieldComponent,
    ObjectFieldComponentComponent
  ]
})
export class AppModule { }
