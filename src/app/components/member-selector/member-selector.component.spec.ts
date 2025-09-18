import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberSelector } from './member-selector.component';

describe('MemberSelector', () => {
  let component: MemberSelector;
  let fixture: ComponentFixture<MemberSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemberSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(MemberSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
