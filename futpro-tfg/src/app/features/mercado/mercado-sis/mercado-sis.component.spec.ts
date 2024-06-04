import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MercadoSisComponent } from './mercado-sis.component';

describe('MercadoSisComponent', () => {
  let component: MercadoSisComponent;
  let fixture: ComponentFixture<MercadoSisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MercadoSisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MercadoSisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
