import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReleaseMoviesComponent } from './new-release-movies.component';

describe('NewReleaseMoviesComponent', () => {
  let component: NewReleaseMoviesComponent;
  let fixture: ComponentFixture<NewReleaseMoviesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewReleaseMoviesComponent]
    });
    fixture = TestBed.createComponent(NewReleaseMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
