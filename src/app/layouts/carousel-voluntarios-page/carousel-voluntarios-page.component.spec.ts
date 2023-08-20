import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselVoluntariosPageComponent } from './carousel-voluntarios-page.component';

describe('CarouselVoluntariosPageComponent', () => {
  let component: CarouselVoluntariosPageComponent;
  let fixture: ComponentFixture<CarouselVoluntariosPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselVoluntariosPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselVoluntariosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
