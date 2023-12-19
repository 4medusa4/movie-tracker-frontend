import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { AccountComponent } from './components/account/account.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { comingsoonMoviesComponent } from './components/comingsoon-movies/comingsoon-movies.component';
import { FooterComponent } from './components/footer/footer.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MovieComponent } from './components/movie/movie.component';
import { NavbarPrimaryComponent } from './components/navbar-primary/navbar-primary.component';
import { NavbarUserComponent } from './components/navbar-user/navbar-user.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NewReleaseMoviesComponent } from './components/new-release-movies/new-release-movies.component';
import { SearchMoviesComponent } from './components/search-movies/search-movies.component';
import { SearchComponent } from './components/search/search.component';
import { SignupComponent } from './components/signup/signup.component';
import { TrackListComponent } from './components/track-list/track-list.component';
import { TrackingsComponent } from './components/trackings/trackings.component';
import { TrailerComponent } from './components/trailer/trailer.component';
import { UpcomingMovieDetailsComponent } from './components/upcoming-movie-details/upcoming-movie-details.component';
import { UpcomingMoviesComponent } from './components/upcoming-movies/upcoming-movies.component';
import AuthService from './service/auth-service/auth-service.service';
import { MovieApiServiceService } from './service/movie-api-service/movie-api-service.service';
@NgModule({
  declarations: [
    AppComponent,
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
    comingsoonMoviesComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [MovieApiServiceService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
