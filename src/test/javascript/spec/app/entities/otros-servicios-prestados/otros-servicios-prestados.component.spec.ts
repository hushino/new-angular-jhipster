import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { Rrhh2TestModule } from '../../../test.module';
import { OtrosServiciosPrestadosComponent } from 'app/entities/otros-servicios-prestados/otros-servicios-prestados.component';
import { OtrosServiciosPrestadosService } from 'app/entities/otros-servicios-prestados/otros-servicios-prestados.service';
import { OtrosServiciosPrestados } from 'app/shared/model/otros-servicios-prestados.model';

describe('Component Tests', () => {
  describe('OtrosServiciosPrestados Management Component', () => {
    let comp: OtrosServiciosPrestadosComponent;
    let fixture: ComponentFixture<OtrosServiciosPrestadosComponent>;
    let service: OtrosServiciosPrestadosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Rrhh2TestModule],
        declarations: [OtrosServiciosPrestadosComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              data: of({
                defaultSort: 'id,asc',
              }),
              queryParamMap: of(
                convertToParamMap({
                  page: '1',
                  size: '1',
                  sort: 'id,desc',
                })
              ),
            },
          },
        ],
      })
        .overrideTemplate(OtrosServiciosPrestadosComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OtrosServiciosPrestadosComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OtrosServiciosPrestadosService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new OtrosServiciosPrestados(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.otrosServiciosPrestados && comp.otrosServiciosPrestados[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new OtrosServiciosPrestados(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.otrosServiciosPrestados && comp.otrosServiciosPrestados[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,desc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,desc', 'id']);
    });
  });
});
