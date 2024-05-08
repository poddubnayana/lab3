import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./entities/home/home.component";
import { TableComponent } from "./entities/table/table.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'table', component: TableComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
