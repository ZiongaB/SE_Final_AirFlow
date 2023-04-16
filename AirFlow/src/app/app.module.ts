/*
When making a new page we need to import the component for the new age
***/

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//<!-- Sebastian Mark -->
import { RouterModule, Routes } from '@angular/router';
//  <!-- Sebastian Mark -->

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardingPageComponent } from './components/dynamic/boarding-page/boarding-page.component';
import { BudgetComponent } from './components/dynamic/budget_page/budget.component';
import { CalendarPageComponent } from './components/dynamic/calendar-page/calendar-page.component';
import { ChecklistPageComponent } from './components/dynamic/checklist-page/checklist-page.component';
import { LoginComponent } from './components/dynamic/login_page/login.component';
import { PackingComponent } from './components/dynamic/packing_page/packing.component';
import { SignupComponent } from './components/dynamic/signup_page/signup.component';
import { TripsComponent } from './components/dynamic/trips_page/trips.component';

// <!-- Sebastian Mark -->
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
//   <!-- Sebastian Mark -->

import { AirportsComponent } from './components/static/airports/airports.component';
import { Airport1PageComponent } from './components/static/airport1-page/airport1-page.component';
import { Airport2PageComponent } from './components/static/airport2-page/airport2-page.component';
import { Airport3PageComponent } from './components/static/airport3-page/airport3-page.component';
import { Location1PageComponent } from './components/static/location1-page/location1-page.component';
import { Location2PageComponent } from './components/static/location2-page/location2-page.component';
import { Location3PageComponent } from './components/static/location3-page/location3-page.component';

import { ChatbotComponent } from './components/dynamic/chatbot/chatbot.component';
import { CalendarComponent } from './components/dynamic/calendar/calendar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './components/static/home/home.component';


//   <!-- Sebastian Mark did some of this -->
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    PackingComponent,
    TripsComponent,
    ChatbotComponent,
    CalendarComponent,
    BoardingPageComponent,
    BudgetComponent,
    CalendarPageComponent,
    ChecklistPageComponent,
    
    Airport1PageComponent,
    Airport2PageComponent,
    Airport3PageComponent,
    Location1PageComponent,
    Location2PageComponent,
    Location3PageComponent,
    NavbarComponent,
    HomeComponent,
    AirportsComponent,

   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


// <!-- Sebastian Mark -->