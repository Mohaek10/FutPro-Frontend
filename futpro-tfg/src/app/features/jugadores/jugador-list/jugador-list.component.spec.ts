import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadorListComponent } from './jugador-list.component';

describe('JugadorListComponent', () => {
  let component: JugadorListComponent;
  let fixture: ComponentFixture<JugadorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JugadorListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JugadorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
