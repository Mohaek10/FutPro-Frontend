import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEquipoComponent } from './manage-equipo.component';

describe('ManageEquipoComponent', () => {
  let component: ManageEquipoComponent;
  let fixture: ComponentFixture<ManageEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageEquipoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
