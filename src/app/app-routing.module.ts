import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./public/pages/home/home.component";
import {OffersComponent} from "./business/pages/offers/offers.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'business/offers', component: OffersComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
