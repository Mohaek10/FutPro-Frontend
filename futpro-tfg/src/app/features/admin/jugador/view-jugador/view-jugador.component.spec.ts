import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewJugadorComponent } from './view-jugador.component';

describe('ViewJugadorComponent', () => {
  let component: ViewJugadorComponent;
  let fixture: ComponentFixture<ViewJugadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewJugadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewJugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
