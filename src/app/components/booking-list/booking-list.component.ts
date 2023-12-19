import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieApiServiceService } from 'src/app/service/movie-api-service/movie-api-service.service';
@Component({
  selector: 'app-vooking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {

  constructor(private service: MovieApiServiceService, private router: Router) { }

  bookingsResult: any = []

  ngOnInit(): void {
    this.bookingsData();
  }

  bookingsData() {
    this.service.trendingMovieApiData().subscribe((result) => {
      console.log(result, 'trendingmovieresult#')
      this.bookingsResult = result.results;
    });
  }
}
