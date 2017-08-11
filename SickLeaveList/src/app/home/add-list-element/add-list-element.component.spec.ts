import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddListElementComponent } from './add-list-element.component';

describe('AddListElementComponent', () => {
  let component: AddListElementComponent;
  let fixture: ComponentFixture<AddListElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddListElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddListElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
