import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CelularDetailComponent } from './celular-detail.component';

describe('CelularDetailComponent', () => {
  let component: CelularDetailComponent;
  let fixture: ComponentFixture<CelularDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CelularDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CelularDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
