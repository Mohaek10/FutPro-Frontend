import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrateEquipoComponent } from './crate-equipo.component';

describe('CrateEquipoComponent', () => {
  let component: CrateEquipoComponent;
  let fixture: ComponentFixture<CrateEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrateEquipoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrateEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
