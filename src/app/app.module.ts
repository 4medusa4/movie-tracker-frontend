import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';


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
import { MovieApiServiceService } from './service/movie-api-service/movie-api-service.service';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { NavbarUserComponent } from './components/navbar-user/navbar-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SearchMoviesComponent } from './components/search-movies/search-movies.component';
import { NavbarPrimaryComponent } from './components/navbar-primary/navbar-primary.component';
import { TrackingsComponent } from './components/trackings/trackings.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { UpcomingMovieDetailsComponent } from './components/upcoming-movie-details/upcoming-movie-details.component';
import AuthService from './service/auth-service/auth-service.service';
import { comingsoonMoviesComponent } from './components/comingsoon-movies/comingsoon-movies.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TrailerComponent,
    LoginComponent,
    SignupComponent,
    MovieComponent,
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
    NavbarUserComponent,
    SearchMoviesComponent,
    NavbarPrimaryComponent,
    TrackingsComponent,
    ForgotPasswordComponent,
    CheckoutComponent,
    UpcomingMovieDetailsComponent,
    comingsoonMoviesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule
  ],
  providers: [MovieApiServiceService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
