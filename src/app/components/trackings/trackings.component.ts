import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { NgZone } from '@angular/core';
@Component({
  selector: 'app-trackings',
  templateUrl: './trackings.component.html',
  styleUrls: ['./trackings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrackingsComponent implements OnInit {
  getDayPartControl(index: number): FormControl {
    return (this.dayPartsForm.get('dayParts') as FormArray).controls[index] as FormControl;
  }
  @Input() dates: Date[] = [];
  getMovieResult: any;

  // select date
  selectedDayOfWeek: string = '';
  dayParts: string[] = ['Morning', 'Afternoon', 'Evening'];
selectedDayParts: boolean[] = this.initializeSelectedDayParts();
initializeSelectedDayParts(): boolean[] {
  return Array.from({ length: this.dayParts.length }, () => false);
}


  dayPartsForm: FormGroup = new FormGroup({
    dayParts: new FormArray(this.dayParts.map(() => new FormControl(false)))
  });
  selectedDate: string = '';
  ticketCount: number = 0; // Initial number of tickets
  selectedLocation: string = ''; // Initialize with an empty string
  private pricePerTicket: number = 1000; // Replace with your actual price

  constructor(private formBuilder: FormBuilder,private ngZone: NgZone) {
    this.dayPartsForm = this.formBuilder.group({
      dayParts: new FormArray([]),
    });
  }

  ngOnInit(): void {
    // Initialize dayPartsForm with checkboxes
    this.dayParts.forEach(() => {
      (this.dayPartsForm.get('dayParts') as FormArray).push(new FormControl(false));
    });
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

  // Your other methods...

}

