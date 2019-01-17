import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LauncherFormComponent } from './launcher-form.component';

describe('LauncherFormComponent', () => {
  let component: LauncherFormComponent;
  let fixture: ComponentFixture<LauncherFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LauncherFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LauncherFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
