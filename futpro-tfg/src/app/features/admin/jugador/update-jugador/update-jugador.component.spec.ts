import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateJugadorComponent } from './update-jugador.component';

describe('UpdateJugadorComponent', () => {
  let component: UpdateJugadorComponent;
  let fixture: ComponentFixture<UpdateJugadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateJugadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateJugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
