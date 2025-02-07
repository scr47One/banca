import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentModalAddComponent } from './investment-modal-add.component';

describe('InvestmentModalAddComponent', () => {
  let component: InvestmentModalAddComponent;
  let fixture: ComponentFixture<InvestmentModalAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvestmentModalAddComponent]
    });
    fixture = TestBed.createComponent(InvestmentModalAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
