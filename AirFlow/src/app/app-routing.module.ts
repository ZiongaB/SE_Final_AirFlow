/*
When making a new page we need to import the component for the new age
***/

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


import { AirportsComponent } from './components/static/airports/airports.component';
import { Airport1PageComponent } from './components/static/airport1-page/airport1-page.component';
import { Airport2PageComponent } from './components/static/airport2-page/airport2-page.component';
import { Airport3PageComponent } from './components/static/airport3-page/airport3-page.component';
import { Location1PageComponent } from './components/static/location1-page/location1-page.component';
import { Location2PageComponent } from './components/static/location2-page/location2-page.component';
import { Location3PageComponent } from './components/static/location3-page/location3-page.component';
import { HomeComponent } from './components/static/home/home.component';
import { ChatbotComponent } from './components/dynamic/chatbot/chatbot.component';
import { AuthGuardService } from './components/services/auth-guard.service';

/*
After importing a new component we need to define the route
*/

//  <!-- Sebastian Mark -->
const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "boarding", component: BoardingPageComponent, canActivate:[AuthGuardService]  },
  { path: "budget", component: BudgetComponent, canActivate:[AuthGuardService]  },
  { path: "calendar", component: CalendarPageComponent, canActivate:[AuthGuardService]  },
  { path: "checklist", component: ChecklistPageComponent, canActivate:[AuthGuardService]  },
  { path: "packing", component: PackingComponent, canActivate:[AuthGuardService]  },
  
  // navbar routing
  { path: "signup", component: SignupComponent },
  { path: "trip", component: TripsComponent, canActivate:[AuthGuardService] },
  {path: "home", component: HomeComponent},
  {path: "chatbot", component: ChatbotComponent},
 
   //Airport routing
   {path: "airports", component: AirportsComponent},
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
