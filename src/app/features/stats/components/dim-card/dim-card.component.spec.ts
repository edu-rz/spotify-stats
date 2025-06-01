import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DimCardComponent } from './dim-card.component';

describe('DimCardComponent', () => {
  let component: DimCardComponent;
  let fixture: ComponentFixture<DimCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DimCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DimCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
