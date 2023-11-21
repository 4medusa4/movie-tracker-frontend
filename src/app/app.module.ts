import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { TrailerComponent } from './components/trailer/trailer.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { MovieComponent } from './components/movie/movie.component';
import { NewReleaseMoviesComponent } from './components/new-release-movies/new-release-movies.component';
import { UpcomingMoviesComponent } from './components/upcoming-movies/upcoming-movies.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { TrackListComponent } from './components/track-list/track-list.component';
import { AccountComponent } from './components/account/account.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { MovieApiServiceService } from './service/movie-api-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NavbarTestComponent } from './components/navbar-test/navbar-test.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { SeatsComponent } from './seats/seats.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TrailerComponent,
    LoginComponent,
    SignupComponent,
    MovieComponent,
    NavbarTestComponent,
    NewReleaseMoviesComponent,
    UpcomingMoviesComponent,
    BookingsComponent,
    TrackListComponent,
    AccountComponent,
    AboutusComponent,
    FooterComponent,
    SearchComponent,
    MovieDetailsComponent,
    BookingListComponent,
    SeatsComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [MovieApiServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
