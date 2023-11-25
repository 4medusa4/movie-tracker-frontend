import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { MovieApiServiceService } from 'src/app/service/movie-api-service.service';
import { ActivatedRoute, Router } from '@angular/router';
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
