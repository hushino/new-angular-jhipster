import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Rrhh2TestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { OtrosServiciosPrestadosDeleteDialogComponent } from 'app/entities/otros-servicios-prestados/otros-servicios-prestados-delete-dialog.component';
import { OtrosServiciosPrestadosService } from 'app/entities/otros-servicios-prestados/otros-servicios-prestados.service';

describe('Component Tests', () => {
  describe('OtrosServiciosPrestados Management Delete Component', () => {
    let comp: OtrosServiciosPrestadosDeleteDialogComponent;
    let fixture: ComponentFixture<OtrosServiciosPrestadosDeleteDialogComponent>;
    let service: OtrosServiciosPrestadosService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Rrhh2TestModule],
        declarations: [OtrosServiciosPrestadosDeleteDialogComponent],
      })
        .overrideTemplate(OtrosServiciosPrestadosDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(OtrosServiciosPrestadosDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OtrosServiciosPrestadosService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
