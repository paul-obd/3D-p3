import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeC1Component } from './three-c1.component';

describe('ThreeC1Component', () => {
  let component: ThreeC1Component;
  let fixture: ComponentFixture<ThreeC1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThreeC1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeC1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
