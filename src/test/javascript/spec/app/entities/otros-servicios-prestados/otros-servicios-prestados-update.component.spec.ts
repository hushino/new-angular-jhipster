import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { Rrhh2TestModule } from '../../../test.module';
import { OtrosServiciosPrestadosUpdateComponent } from 'app/entities/otros-servicios-prestados/otros-servicios-prestados-update.component';
import { OtrosServiciosPrestadosService } from 'app/entities/otros-servicios-prestados/otros-servicios-prestados.service';
import { OtrosServiciosPrestados } from 'app/shared/model/otros-servicios-prestados.model';

describe('Component Tests', () => {
  describe('OtrosServiciosPrestados Management Update Component', () => {
    let comp: OtrosServiciosPrestadosUpdateComponent;
    let fixture: ComponentFixture<OtrosServiciosPrestadosUpdateComponent>;
    let service: OtrosServiciosPrestadosService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Rrhh2TestModule],
        declarations: [OtrosServiciosPrestadosUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(OtrosServiciosPrestadosUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OtrosServiciosPrestadosUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OtrosServiciosPrestadosService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new OtrosServiciosPrestados(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new OtrosServiciosPrestados();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
