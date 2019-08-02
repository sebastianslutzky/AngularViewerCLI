import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObjectContainerComponent } from './object-container/object-container.component';
import { ObjectRouterComponent } from './object-router/object-router.component';
import { RouteLogComponent } from './route-log/route-log.component';
import { RouteTesterComponent } from './route-tester/route-tester.component';

const routes: Routes = [
  // {path: 'menu/:destination', component: ObjectRouterComponent}
  {
    path: 'object/:destination',
    component: ObjectRouterComponent
  },
  {
    path: 'invoke/:destination',
    component: ObjectRouterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
