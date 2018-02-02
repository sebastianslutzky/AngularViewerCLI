import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObjectContainerComponent } from './object-container/object-container.component';

const routes: Routes = [
  {path: 'object/:url', component: ObjectContainerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
