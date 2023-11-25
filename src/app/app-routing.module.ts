import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TrailerComponent } from './components/trailer/trailer.component';
import { AccountComponent } from './components/account/account.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { MovieComponent } from './components/movie/movie.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NewReleaseMoviesComponent } from './components/new-release-movies/new-release-movies.component';
import { TrackListComponent } from './components/track-list/track-list.component';
import { UpcomingMoviesComponent } from './components/upcoming-movies/upcoming-movies.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { BookingListComponent } from './components/booking-list/booking-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchMoviesComponent } from './components/search-movies/search-movies.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path:'home', component: HomeComponent},
  {path:'account', component: AccountComponent},
  {path:'aboutus', component: AboutusComponent},
  {path:'account', component: AccountComponent},
  {path:'bookings/:id', component: BookingsComponent},
  {path:'checkout', component: CheckoutComponent},
  {path:'booking-list', component: BookingListComponent},
  {path:'contact', component: ContactComponent},
  {path:'footer', component: FooterComponent},
  {path:'movie', component: MovieComponent},
  {path:'movie/:id', component: MovieDetailsComponent},
  {path:'navbar', component: NavbarComponent},
  {path:'navbar-user', component: NavbarComponent},
  {path:'login', component: LoginComponent},
  {path:'new-release-movies', component: NewReleaseMoviesComponent},
  {path:'search', component: SearchComponent},
  {path:'search-movies', component: SearchMoviesComponent},
  {path:'signup', component: SignupComponent},
  {path:'track-list', component: TrackListComponent},
  {path:'trailer', component:TrailerComponent},
  {path:'upcoming-movies', component:UpcomingMoviesComponent},
  {path:'forgot-password', component:ForgotPasswordComponent},
  {path:'**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
