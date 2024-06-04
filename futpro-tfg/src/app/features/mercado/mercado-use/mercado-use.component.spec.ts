import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MercadoUseComponent } from './mercado-use.component';

describe('MercadoUseComponent', () => {
  let component: MercadoUseComponent;
  let fixture: ComponentFixture<MercadoUseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MercadoUseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MercadoUseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
