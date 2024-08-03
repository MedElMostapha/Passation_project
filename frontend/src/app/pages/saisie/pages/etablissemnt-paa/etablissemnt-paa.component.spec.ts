import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtablissemntPaaComponent } from './etablissemnt-paa.component';

describe('EtablissemntPaaComponent', () => {
  let component: EtablissemntPaaComponent;
  let fixture: ComponentFixture<EtablissemntPaaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtablissemntPaaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtablissemntPaaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
