import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObjectContainerComponent } from './object-container/object-container.component';
import { ObjectRouterComponent } from './object-router/object-router.component';
import { RouteLogComponent } from './route-log/route-log.component';

const routes: Routes = [
  {path: 'menu/:destination', component: ObjectRouterComponent}
  //{path: 'object/:url', component: ObjectRouterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
