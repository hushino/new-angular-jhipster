import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { Rrhh2TestModule } from '../../../test.module';
import { PersonaDetailComponent } from 'app/entities/persona/persona-detail.component';
import { Persona } from 'app/shared/model/persona.model';

describe('Component Tests', () => {
  describe('Persona Management Detail Component', () => {
    let comp: PersonaDetailComponent;
    let fixture: ComponentFixture<PersonaDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ persona: new Persona(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Rrhh2TestModule],
        declarations: [PersonaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(PersonaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PersonaDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load persona on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.persona).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
