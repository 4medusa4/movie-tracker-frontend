import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieApiServiceService } from 'src/app/service/movie-api-service/movie-api-service.service';


import { NgZone } from '@angular/core';
@Component({
  selector: 'app-trackings',
  templateUrl: './trackings.component.html',
  styleUrls: ['./trackings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TrackingsComponent implements OnInit {

  getMovieResult: any;
  autoBookPreference: boolean = false;

  dayParts: string[] = ['Morning', 'Afternoon', 'Evening'];
  selectedDayParts: boolean[] = this.initializeSelectedDayParts();
  dayPartsForm!: FormGroup;

  selectedDayOfWeek: string = '';
  ticketCount: number = 0;
  selectedLocation: string = '';
  private pricePerTicket: number = 1000;
  selectedSeatArrangement: String = '';
  selectedPartofTheDay: String = '';


  getDayPartControl(index: number): FormControl {
    return (this.dayPartsForm.get('dayParts') as FormArray).controls[index] as FormControl;
  }

  constructor(
    private service: MovieApiServiceService,
    private _router: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private ngZone: NgZone,
    private router: Router
  ) { }

  ngOnInit(): void {
    let getParamId = this._router.snapshot.paramMap.get('id');
    console.log(getParamId, 'getparamid#');
    this.getMovie(getParamId);

    this.dayPartsForm = this.formBuilder.group({
      dayParts: new FormArray(this.dayParts.map(() => new FormControl(false)))
    });

    this.dayParts.forEach(() => {
      (this.dayPartsForm.get('dayParts') as FormArray).push(new FormControl(false));
    });
  }


  getMovie(id: any) {
    this.service.getMovieDetails(id).subscribe((result) => {
      console.log(result, 'getmoviedetails#')
      this.getMovieResult = result;
    });
  }

  initializeSelectedDayParts(): boolean[] {
    return Array.from({ length: this.dayParts.length }, () => false);
  }

  onDayPartChange(index: number) {
    this.selectedDayParts[index] = !this.selectedDayParts[index];
  }
  incrementTickets() {
    console.log('Incrementing tickets');
    this.ngZone.run(() => {
      this.ticketCount++;
      this.updateSelectedTicketCount();
      console.log('Ticket count after increment:', this.ticketCount);
    });
  }

  decrementTickets() {
    console.log('Decrementing tickets');
    if (this.ticketCount > 0) {
      this.ngZone.run(() => {
        this.ticketCount--;
        this.updateSelectedTicketCount();
        console.log('Ticket count after decrement:', this.ticketCount);
      });
    }
  }

  updateSelectedTicketCount() {
    const selectedDayPartsFormArray = this.dayPartsForm.get('dayParts') as FormArray;

    for (let i = 0; i < selectedDayPartsFormArray.length; i++) {
      const control = selectedDayPartsFormArray.controls[i] as FormControl;
      control.setValue(this.selectedDayParts[i]);
    }
  }

  updateSelectedLocation(location: string) {
    console.log(location);
    this.selectedLocation = location;
    console.log('Selected location:', this.selectedLocation);
  }

  onLocationChange() {
    console.log('selected', this.selectedLocation);
  }

  calculateTotalAmount(): number {
    return this.ticketCount * this.pricePerTicket;
  }

  onSubmit = () => {
    const trackingData = {
      currentDate: new Date(),
      selectedDayOfWeek: this.selectedDayOfWeek,
      partOfTheDay: this.selectedPartofTheDay,
      arrangement: this.selectedSeatArrangement,
      numberOfSeats: this.ticketCount,
      selectedLocation: this.selectedLocation,
      autoBooking: this.autoBookPreference,
      totalAmount: this.calculateTotalAmount(),
      movieId: this.getMovieResult['id'],
      bookedDate: this.getMovieResult['release_date'],
      theatreId: 1
    }
    console.log('Tracking data:', trackingData);

    this.service.addToTrackList(trackingData,
      (response: any) => {
        if (response.status === 200) {
          console.log('Successfully added to track list');
          if (this.autoBookPreference) {
            this.router.navigate(['/checkout'], { queryParams: { success: true } })
          } else {
            this.router.navigate(['/tracking-list']);
          }
        }
      },
      (error: any) => {
        console.error('Error in booking:', error);
      }
    ).subscribe();
  }
}

