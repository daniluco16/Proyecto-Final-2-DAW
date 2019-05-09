import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculaFavComponent } from './pelicula-fav.component';

describe('PeliculaFavComponent', () => {
  let component: PeliculaFavComponent;
  let fixture: ComponentFixture<PeliculaFavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeliculaFavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeliculaFavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
