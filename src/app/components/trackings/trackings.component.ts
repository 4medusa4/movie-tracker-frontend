import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NgModel } from '@angular/forms';
import { MovieApiServiceService } from 'src/app/service/movie-api-service/movie-api-service.service';
import { ActivatedRoute, Router } from '@angular/router';


import { NgZone } from '@angular/core';
import axios from 'axios';
import AuthService from 'src/app/service/auth-service/auth-service.service';
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


  getDayPartControl(index: number): FormControl {
    return (this.dayPartsForm.get('dayParts') as FormArray).controls[index] as FormControl;
  }

  constructor(
    private service: MovieApiServiceService,
    private _router: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private ngZone: NgZone,private authService: AuthService, private router: Router
  ) {}

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


  // @Input() dates: Date[] = [];
  // // select date
  // selectedDayOfWeek: string = '';
  // dayParts: string[] = ['Morning', 'Afternoon', 'Evening'];
  // selectedDayParts: boolean[] = this.initializeSelectedDayParts();
  // initializeSelectedDayParts(): boolean[] {
  //   return Array.from({ length: this.dayParts.length }, () => false);
  // }

  // dayPartsForm: FormGroup = new FormGroup({
  //   dayParts: new FormArray(this.dayParts.map(() => new FormControl(false)))
  // });
  // selectedDate: string = '';
  // ticketCount: number = 0; // Initial number of tickets
  // selectedLocation: string = ''; // Initialize with an empty string
  // private pricePerTicket: number = 1000; // Replace with your actual price

  // constructor(private service: MovieApiServiceService, private router: ActivatedRoute, private cdr: ChangeDetectorRef,private formBuilder: FormBuilder, private ngZone: NgZone) {
  //   this.dayPartsForm = this.formBuilder.group({
  //     dayParts: new FormArray([]),
  //   });
  // }

  // ngOnInit(): void {

  //   let getParamId = this.router.snapshot.paramMap.get('id');
  //   console.log(getParamId, 'getparamid#');
  //   this.getMovie(getParamId);
  //   // Initialize dayPartsForm with checkboxes
  //   this.dayParts.forEach(() => {
  //     (this.dayPartsForm.get('dayParts') as FormArray).push(new FormControl(false));
  //   });
  // }

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
      selectedDayOfWeek: this.selectedDayOfWeek,
      selectedDayParts: this.selectedDayParts,
      ticketCount: this.ticketCount,
      selectedLocation: this.selectedLocation,
      totalAmount: this.calculateTotalAmount()
    }


  //   this.authService.newBooking(trackingData,
  //     (response: any) => {
  //       // Handle success
  //       this.router.navigate(['/checkout'], {queryParams: { success: true}})
  //       console.log('Booking successful:', response);
  //     },
  //     (error: any) => {
  //       // Handle error
  //       console.error('Error in booking:', error);
  //     }
  //   ).subscribe();
  // }

    this.authService.newBooking(trackingData,
      (response: any) => {

        if(this.autoBookPreference){
          // Navigate to UI when preference is checked
          this.router.navigate(['/checkout'], {queryParams: { success: true}})
          console.log('Booking successful:', response);
        } else {
          // Navigate to UI when preference is not checked
          this.router.navigate(['/tracking-list']);
        }

      },
      (error: any) => {
        // Handle error
        console.error('Error in booking:', error);
      }
    ).subscribe();
  }
}

