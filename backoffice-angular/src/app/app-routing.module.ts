import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArchivedPageComponent } from './archived-page/archived-page.component';
import { NewPageComponent } from './new-page/new-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/new-page', pathMatch: 'full' },
  { path: 'new-page', component: NewPageComponent },
  { path: 'archived-page', component: ArchivedPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
