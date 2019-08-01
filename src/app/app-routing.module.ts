import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObjectContainerComponent } from './object-container/object-container.component';
import { ObjectRouterComponent } from './object-router/object-router.component';
import { RouteLogComponent } from './route-log/route-log.component';
import { RouteTesterComponent } from './route-tester/route-tester.component';
import { ObjectAction } from './models/ro/iresource';
import { ErrorDetailsComponent } from './error-details/error-details.component';
import { ObjectComponent } from './object/object.component';

const routes: Routes = [
  // {path: 'menu/:destination', component: ObjectRouterComponent}
  {
    path:   ':first/:restOfPath',
        component: ObjectComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
