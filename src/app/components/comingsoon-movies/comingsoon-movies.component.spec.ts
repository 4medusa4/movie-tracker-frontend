import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComingsoonMoviesComponent } from './comingsoon-movies.component';

describe('ComingsoonMoviesComponent', () => {
  let component: ComingsoonMoviesComponent;
  let fixture: ComponentFixture<ComingsoonMoviesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ComingsoonMoviesComponent]
    });
    fixture = TestBed.createComponent(ComingsoonMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
