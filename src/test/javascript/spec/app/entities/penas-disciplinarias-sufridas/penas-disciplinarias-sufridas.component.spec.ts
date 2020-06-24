import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { Rrhh2TestModule } from '../../../test.module';
import { PenasDisciplinariasSufridasComponent } from 'app/entities/penas-disciplinarias-sufridas/penas-disciplinarias-sufridas.component';
import { PenasDisciplinariasSufridasService } from 'app/entities/penas-disciplinarias-sufridas/penas-disciplinarias-sufridas.service';
import { PenasDisciplinariasSufridas } from 'app/shared/model/penas-disciplinarias-sufridas.model';

describe('Component Tests', () => {
  describe('PenasDisciplinariasSufridas Management Component', () => {
    let comp: PenasDisciplinariasSufridasComponent;
    let fixture: ComponentFixture<PenasDisciplinariasSufridasComponent>;
    let service: PenasDisciplinariasSufridasService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Rrhh2TestModule],
        declarations: [PenasDisciplinariasSufridasComponent],
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
        .overrideTemplate(PenasDisciplinariasSufridasComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PenasDisciplinariasSufridasComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PenasDisciplinariasSufridasService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PenasDisciplinariasSufridas(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.penasDisciplinariasSufridas && comp.penasDisciplinariasSufridas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new PenasDisciplinariasSufridas(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.penasDisciplinariasSufridas && comp.penasDisciplinariasSufridas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
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
