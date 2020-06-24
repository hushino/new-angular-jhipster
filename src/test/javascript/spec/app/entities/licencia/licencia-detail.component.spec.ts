import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Rrhh2TestModule } from '../../../test.module';
import { LicenciaDetailComponent } from 'app/entities/licencia/licencia-detail.component';
import { Licencia } from 'app/shared/model/licencia.model';

describe('Component Tests', () => {
  describe('Licencia Management Detail Component', () => {
    let comp: LicenciaDetailComponent;
    let fixture: ComponentFixture<LicenciaDetailComponent>;
    const route = ({ data: of({ licencia: new Licencia(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Rrhh2TestModule],
        declarations: [LicenciaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(LicenciaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(LicenciaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load licencia on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.licencia).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
