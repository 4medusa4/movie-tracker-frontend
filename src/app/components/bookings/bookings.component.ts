import { Component, Input, ElementRef, Renderer2, ViewChild, HostListener, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NgModel } from '@angular/forms';
import { MovieApiServiceService } from 'src/app/service/movie-api-service/movie-api-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  @Input() dates: Date[] = [];
  @ViewChild('dateSelector', { static: false }) dateSelector?: ElementRef;
  @ViewChild(NgModel) ngModel!: NgModel;
  getMovieResult: any;


  scrollPosition = 0;
  itemWidth = 100; // Adjust based on the width of your date items
  containerWidth = 300; // Adjust based on the width of your container

  // private scrollSubject=new Subject<number>();
  date!: Date;
  selectedDate!: string;
  selectedTicketCount: string = '';

  constructor(private service: MovieApiServiceService, private router: ActivatedRoute, private renderer: Renderer2, private cdr: ChangeDetectorRef) {
    this.generateDates();
    // this.scrollSubject.pipe(debounceTime(50)).subscribe(delta=>this.scrollContainer(delta));
  }
  ngOnInit(): void {
    let getParamId = this.router.snapshot.paramMap.get('id');
    console.log(getParamId, 'getparamid#');
    this.getMovie(getParamId);
  }


  getMovie(id: any) {
    this.service.getMovieDetails(id).subscribe((result) => {
      console.log(result, 'getmoviedetails#')
      this.getMovieResult = result;
    });
  }

  generateDates() {
    // Generate dates for the next 30 days
    const today = new Date();
    for (let i = 0; i < 60; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      this.dates.push(date);
    }
  }

  // @HostListener('wheel', ['$event'])
  // handleWheelEvent(event: WheelEvent) {
  //   const deltaFactor =5;
  //   const delta=Math.sign(event.deltaY)*deltaFactor*this.itemWidth;

  //   if(delta!==0){
  //     this.scrollContainer(delta);
  //     event.preventDefault(); 
  //   }
  // }

  public scrollContainer(delta: number) {
    console.log('Delta:', delta)
    if (this.dateSelector) {
      const container = this.dateSelector.nativeElement;
      const maxScroll = this.dates.length * this.itemWidth - this.containerWidth;

      this.scrollPosition += delta;

      if (this.scrollPosition < 0) {
        this.scrollPosition = 0;
      } else if (this.scrollPosition > maxScroll) {
        this.scrollPosition = maxScroll;
      }

      this.renderer.setStyle(container, 'transform', `translateX(-${this.scrollPosition}px)`);
    }
    this.cdr.detectChanges();
    console.log('Scroll Position:', this.scrollPosition);
  }

  dateSelectorTransform = 0; // Initialize the transform

  onMouseWheel(event: any) {
    const delta = event.deltaY || event.wheelDelta;

    if (delta) {
      const maxScroll = this.dates.length * this.itemWidth - this.containerWidth;

      let newPosition = this.dateSelectorTransform + delta;

      if (newPosition > 0) {
        newPosition = 0;
      } else if (newPosition < -maxScroll) {
        newPosition = -maxScroll;
      }

      this.dateSelectorTransform = newPosition;

      // Prevent the default action of scrolling the entire page
      event.preventDefault();
    }
  }

  selectedDateIndex: number | null = null;
  selectedShowDate: Date | null = null;
  // ... (your existing code)

  selectDate(selectedDate: Date) {

    if (this.dateSelector) {
      // Clear the 'selected' class from all dates
      this.dates.forEach((date, index) => {
        const dateElement = this.dateSelector!.nativeElement.children[index];
        if (dateElement) {
          this.renderer.removeClass(dateElement, 'selected');
        }
      });

      // Find the index of the selected date
      const index = this.dates.findIndex(date => date === selectedDate);

      if (index !== -1) {
        // Add the 'selected' class to the clicked date
        const dateElement = this.dateSelector.nativeElement.children[index];
        if (dateElement) {
          this.renderer.addClass(dateElement, 'selected');
          console.log('Selected Date Element:', dateElement);
        } else {
          console.log('Date Element is undefined for index:', index);
        }

        // Update the selected date index
        this.selectedDateIndex = index;
        this.selectedDate = this.formatDate(selectedDate);
        this.selectedShowDate = selectedDate;

        console.log('Selected Date:', this.selectedDate);
      } else {
        console.log('Selected Date not found in the dates array.');
      }
    } else {
      console.log('Date Selector is undefined.');
    }


  }


  formatDate(date: Date): string {
    const month = date.toLocaleString('default', { month: 'short' });
    const dayOfMonth = date.getDate();
    const dayOfWeek = date.toLocaleString('default', { weekday: 'short' });

    return `${month}\n${dayOfMonth}\n${dayOfWeek}`;
  }
  todayDate: Date = new Date();

  isDefaultToday(date: Date): boolean {
    // Compare the dates without considering the time
    return date.setHours(0, 0, 0, 0) === this.todayDate.setHours(0, 0, 0, 0);
  }


  //time
  @ViewChild('timeSelector', { static: false }) timeSelector?: ElementRef;

  times: string[] = ['8:30 AM', '10:30 AM', '11:00 AM', '12:30 PM'];
  timeSelectorTransform = 0;
  selectedTime: string | null = null;

  formatTime(time: string): string {
    // You can add your own logic to format the time as needed
    return time;
  }
  selectTime(selectedTime: string) {
    if (this.timeSelector) {
      this.selectedTime = selectedTime;

      // Clear the 'selected' class from all times
      const timeElements = this.timeSelector.nativeElement.children;
      Array.from(timeElements).forEach((element: any) => {
        element.classList.remove('selected');
      });

      // Add the 'selected' class to the clicked time
      const selectedTimeElement = timeElements[this.times.indexOf(selectedTime)];
      if (selectedTimeElement) {
        selectedTimeElement.classList.add('selected');
      }
      this.selectedTime = this.formatTime(selectedTime);


    }

  }
  ticketCount: number = 0; // Initial number of tickets

  incrementTickets() {
    this.ticketCount++;
    this.updateSelectedTicketCount();
  }

  decrementTickets() {
    if (this.ticketCount > 0) {
      this.ticketCount--;
      this.updateSelectedTicketCount();
    }
  }
  updateSelectedTicketCount() {

  }

  rows = ['A', 'B', 'C', 'D', 'E'];
  seats = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  selectedSeats: string[] = [];

  toggleSeat(row: string, seat: string): void {
    const seatId = row + seat;
    const index = this.selectedSeats.indexOf(seatId);

    if (index === -1) {
      this.selectedSeats.push(seatId);
    } else {
      this.selectedSeats.splice(index, 1);
    }
  }

  getSeatClass(row: string, seat: string): string {
    const seatId = row + seat;

    if (this.selectedSeats.includes(seatId)) {
      return 'selected';
    } else if (true) {
      return 'not-available';
    } else {
      return '';
    }
  }

  confirmBooking(): void {
    console.log('Selected Seats:', this.selectedSeats);
  }

  selectedLocation: string = 'Colombo'; // Initialize with an empty string

  // Your other component logic...

  // Add a function to update the selected location
  updateSelectedLocation(location: string) {
    console.log(location);
    this.selectedLocation = location;
    console.log('Selected location:', this.selectedLocation);
  }
  onLocationChange() {
    console.log('selected', this.selectedLocation);
  }

  private pricePerTicket: number = 1000; // Replace with your actual price

  // ...

  calculateTotalAmount(): number {
    return this.ticketCount * this.pricePerTicket;
  }


}
