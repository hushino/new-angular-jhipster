import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPersona } from 'app/shared/model/persona.model';
import { PersonaService } from './persona.service';

@Component({
  templateUrl: './persona-delete-dialog.component.html',
})
export class PersonaDeleteDialogComponent {
  persona?: IPersona;

  constructor(protected personaService: PersonaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.personaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('personaListModification');
      this.activeModal.close();
    });
  }
}
