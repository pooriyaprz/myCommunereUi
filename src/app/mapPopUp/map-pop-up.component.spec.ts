import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPopUpComponent } from './map-pop-up.component';

describe('MapPopUpComponent', () => {
  let component: MapPopUpComponent;
  let fixture: ComponentFixture<MapPopUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapPopUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapPopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
