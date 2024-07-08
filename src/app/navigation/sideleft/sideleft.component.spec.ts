import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideleftComponent } from './sideleft.component';

describe('SideleftComponent', () => {
  let component: SideleftComponent;
  let fixture: ComponentFixture<SideleftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideleftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideleftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
