import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FountainTestComponent } from './fountain-test.component';

describe('FountainTestComponent', () => {
  let component: FountainTestComponent;
  let fixture: ComponentFixture<FountainTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FountainTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FountainTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
