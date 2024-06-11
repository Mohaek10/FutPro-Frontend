import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEquipoComponent } from './update-equipo.component';

describe('UpdateEquipoComponent', () => {
  let component: UpdateEquipoComponent;
  let fixture: ComponentFixture<UpdateEquipoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateEquipoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateEquipoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
