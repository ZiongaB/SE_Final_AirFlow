import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';


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

import {MatButtonModule} from "@angular/material/button"
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatToolbarModule } from "@angular/material/toolbar";
import {MatAutocompleteModule}from "@angular/material/autocomplete";
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatSelectModule} from '@angular/material/select';
import {MatChipsModule} from '@angular/material/chips';
import { Airport1PageComponent } from './components/static/airport1-page/airport1-page.component';
import { Airport2PageComponent } from './components/static/airport2-page/airport2-page.component';
import { Airport3PageComponent } from './components/static/airport3-page/airport3-page.component';
import { Location1PageComponent } from './components/static/location1-page/location1-page.component';
import { Location2PageComponent } from './components/static/location2-page/location2-page.component';
import { Location3PageComponent } from './components/static/location3-page/location3-page.component';

import { ChatbotComponent } from './components/dynamic/chatbot/chatbot.component';
import { CalendarComponent } from './components/dynamic/calendar/calendar.component';
import { NavbarComponent } from './components/dynamic/navbar/navbar.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatListModule,
    MatToolbarModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }