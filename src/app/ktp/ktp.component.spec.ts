import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KtpComponent } from './ktp.component';

describe('KtpComponent', () => {
  let component: KtpComponent;
  let fixture: ComponentFixture<KtpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KtpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KtpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
