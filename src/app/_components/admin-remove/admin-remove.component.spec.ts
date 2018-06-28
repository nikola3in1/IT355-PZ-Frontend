import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRemoveComponent } from './admin-remove.component';

describe('AdminRemoveComponent', () => {
  let component: AdminRemoveComponent;
  let fixture: ComponentFixture<AdminRemoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRemoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
