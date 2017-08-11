import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SickLeaveListComponent } from './sick-leave-list.component';

describe('SickLeaveListComponent', () => {
  let component: SickLeaveListComponent;
  let fixture: ComponentFixture<SickLeaveListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SickLeaveListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SickLeaveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
