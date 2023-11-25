import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingMovieDetailsComponent } from './upcoming-movie-details.component';

describe('UpcomingMovieDetailsComponent', () => {
  let component: UpcomingMovieDetailsComponent;
  let fixture: ComponentFixture<UpcomingMovieDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpcomingMovieDetailsComponent]
    });
    fixture = TestBed.createComponent(UpcomingMovieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
