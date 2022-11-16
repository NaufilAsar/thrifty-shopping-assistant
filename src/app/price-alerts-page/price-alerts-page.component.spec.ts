import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceAlertsPageComponent } from './price-alerts-page.component';

describe('PriceAlertsPageComponent', () => {
  let component: PriceAlertsPageComponent;
  let fixture: ComponentFixture<PriceAlertsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceAlertsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceAlertsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
