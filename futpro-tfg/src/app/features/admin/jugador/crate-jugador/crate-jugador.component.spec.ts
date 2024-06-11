import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrateJugadorComponent } from './crate-jugador.component';

describe('CrateJugadorComponent', () => {
  let component: CrateJugadorComponent;
  let fixture: ComponentFixture<CrateJugadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrateJugadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrateJugadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
