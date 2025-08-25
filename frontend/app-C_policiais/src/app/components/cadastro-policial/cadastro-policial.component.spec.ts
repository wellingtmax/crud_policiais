import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroPolicialComponent } from './cadastro-policial.component';

describe('CadastroPolicialComponent', () => {
  let component: CadastroPolicialComponent;
  let fixture: ComponentFixture<CadastroPolicialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroPolicialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroPolicialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
