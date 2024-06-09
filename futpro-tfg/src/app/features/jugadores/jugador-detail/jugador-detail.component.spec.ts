import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadorDetailComponent } from './jugador-detail.component';

describe('JugadorDetailComponent', () => {
  let component: JugadorDetailComponent;
  let fixture: ComponentFixture<JugadorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JugadorDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JugadorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
