/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NctComponent } from './nct.component';

describe('NctComponent', () => {
  let component: NctComponent;
  let fixture: ComponentFixture<NctComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NctComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NctComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
