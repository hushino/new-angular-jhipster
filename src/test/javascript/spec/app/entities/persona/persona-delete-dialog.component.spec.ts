import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Rrhh2TestModule } from '../../../test.module';
import { PersonaDeleteDialogComponent } from 'app/entities/persona/persona-delete-dialog.component';
import { PersonaService } from 'app/entities/persona/persona.service';

describe('Component Tests', () => {
  describe('Persona Management Delete Component', () => {
    let comp: PersonaDeleteDialogComponent;
    let fixture: ComponentFixture<PersonaDeleteDialogComponent>;
    let service: PersonaService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [Rrhh2TestModule],
        declarations: [PersonaDeleteDialogComponent]
      })
        .overrideTemplate(PersonaDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PersonaDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(PersonaService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
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
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
