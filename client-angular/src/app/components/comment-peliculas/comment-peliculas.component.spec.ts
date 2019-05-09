import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentPeliculasComponent } from './comment-peliculas.component';

describe('CommentPeliculasComponent', () => {
  let component: CommentPeliculasComponent;
  let fixture: ComponentFixture<CommentPeliculasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentPeliculasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentPeliculasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
