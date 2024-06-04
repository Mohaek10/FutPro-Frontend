import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageJugadoresComponent } from './manage-jugadores.component';

describe('ManageJugadoresComponent', () => {
  let component: ManageJugadoresComponent;
  let fixture: ComponentFixture<ManageJugadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageJugadoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageJugadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
