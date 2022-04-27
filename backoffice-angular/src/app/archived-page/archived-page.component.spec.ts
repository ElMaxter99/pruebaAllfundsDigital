import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedPageComponent } from './archived-page.component';

describe('ArchivedPageComponent', () => {
  let component: ArchivedPageComponent;
  let fixture: ComponentFixture<ArchivedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
