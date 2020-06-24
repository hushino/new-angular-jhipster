import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ILicencia } from 'app/shared/model/licencia.model';
import { LicenciaService } from './licencia.service';

@Component({
  templateUrl: './licencia-delete-dialog.component.html',
})
export class LicenciaDeleteDialogComponent {
  licencia?: ILicencia;

  constructor(protected licenciaService: LicenciaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.licenciaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('licenciaListModification');
      this.activeModal.close();
    });
  }
}
