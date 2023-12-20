import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieApiServiceService } from 'src/app/service/movie-api-service/movie-api-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchResults!: any[];
  private subscription: Subscription | undefined;

  constructor(private movieService: MovieApiServiceService) { }

  ngOnInit(): void {
    this.subscription = this.movieService.searchResults$.subscribe(results => {
      this.searchResults = results;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
