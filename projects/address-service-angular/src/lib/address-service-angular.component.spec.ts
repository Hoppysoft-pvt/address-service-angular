import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressServiceAngularComponent } from './address-service-angular.component';

describe('AddressServiceAngularComponent', () => {
  let component: AddressServiceAngularComponent;
  let fixture: ComponentFixture<AddressServiceAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressServiceAngularComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddressServiceAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy()
  });
});
