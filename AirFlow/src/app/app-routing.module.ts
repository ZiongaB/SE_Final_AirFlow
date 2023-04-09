import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BoardingPageComponent } from './components/dynamic/boarding-page/boarding-page.component';
import { BudgetComponent } from './components/dynamic/budget_page/budget.component';
import { CalendarPageComponent } from './components/dynamic/calendar-page/calendar-page.component';
import { ChecklistPageComponent } from './components/dynamic/checklist-page/checklist-page.component';
import { LoginComponent } from './components/dynamic/login_page/login.component';
import { PackingComponent } from './components/dynamic/packing_page/packing.component';
import { SignupComponent } from './components/dynamic/signup_page/signup.component';
import { TripsComponent } from './components/dynamic/trips_page/trips.component';

import { Airport1PageComponent } from './components/static/airport1-page/airport1-page.component';
import { Airport2PageComponent } from './components/static/airport2-page/airport2-page.component';
import { Airport3PageComponent } from './components/static/airport3-page/airport3-page.component';
import { Location1PageComponent } from './components/static/location1-page/location1-page.component';
import { Location2PageComponent } from './components/static/location2-page/location2-page.component';
import { Location3PageComponent } from './components/static/location3-page/location3-page.component';

const routes: Routes = [
  { path: "", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "boarding", component: BoardingPageComponent },
  { path: "budget", component: BudgetComponent },
  { path: "calendar", component: CalendarPageComponent },
  { path: "checklist", component: ChecklistPageComponent },
  { path: "packing", component: PackingComponent },
  { path: "trip", component: TripsComponent },

  { path: "airport1", component: Airport1PageComponent },
  { path: "airport2", component: Airport2PageComponent },
  { path: "airport3", component: Airport3PageComponent },
  { path: "location1", component: Location1PageComponent },
  { path: "location2", component: Location2PageComponent },
  { path: "location3", component: Location3PageComponent },
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
