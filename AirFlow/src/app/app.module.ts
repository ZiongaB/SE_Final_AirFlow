/*
When making a new page we need to import the component for the new age
***/

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './components/services/auth-interceptor.service';
import{CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';


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
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './components/static/home/home.component';
import { TripsPartComponent } from './components/dynamic/trips-part/trips-part.component';
import { MatMenuModule} from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';

// Mat side nav module 
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import {MatDatepickerModule} from '@angular/material/datepicker'
import { MatNativeDateModule,MatRippleModule } from '@angular/material/core';





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
    TripsPartComponent,
  

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
    MatMenuModule,
    FlexLayoutModule, 
    LayoutModule,
    MatSidenavModule,
    MatDividerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }


// <!-- Sebastian Mark -->