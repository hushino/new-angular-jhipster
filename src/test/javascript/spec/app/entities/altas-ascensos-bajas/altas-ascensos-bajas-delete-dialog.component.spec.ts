import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Rrhh2TestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { AltasAscensosBajasDeleteDialogComponent } from 'app/entities/altas-ascensos-bajas/altas-ascensos-bajas-delete-dialog.component';
import { AltasAscensosBajasService } from 'app/entities/altas-ascensos-bajas/altas-ascensos-bajas.service';

describe('Component Tests', () => {
  describe('AltasAscensosBajas Management Delete Component', () => {
    let comp: AltasAscensosBajasDeleteDialogComponent;
    let fixture: ComponentFixture<AltasAscensosBajasDeleteDialogComponent>;
    let service: AltasAscensosBajasService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Rrhh2TestModule],
        declarations: [AltasAscensosBajasDeleteDialogComponent],
      })
        .overrideTemplate(AltasAscensosBajasDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AltasAscensosBajasDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AltasAscensosBajasService);
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
