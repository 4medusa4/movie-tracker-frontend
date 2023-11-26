import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { MovieApiServiceService } from 'src/app/service/movie-api-service/movie-api-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchResult: any;
  searchMovieResult: any;
  showSearchData: boolean = false;  // Add a boolean flag



  constructor(private service: MovieApiServiceService, private router: Router, private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Subscribe to route parameter changes
    this.route.params.subscribe(params => {
      // Check if the route parameter 'id' is present
      this.showSearchData = !params['id'];
    });
  }

  searchForm = new FormGroup({
    'movieName': new FormControl(null)
  });

  submitForm() {
    console.log(this.searchForm.value, 'searchForm#')
    this.service.getSearchMovie(this.searchForm.value).subscribe((result) => {
      console.log(result, 'searchmovie#');
      this.searchResult = result.results
    });
  }

  searchMovieData() {
    this.service.trendingMovieApiData().subscribe((result) => {
      console.log(result, 'searchmovieresult#')
      this.searchMovieResult = result.results;
    });
  }

}
