import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGarantia } from 'app/shared/model/garantia.model';
import { GarantiaService } from './garantia.service';

@Component({
  templateUrl: './garantia-delete-dialog.component.html',
})
export class GarantiaDeleteDialogComponent {
  garantia?: IGarantia;

  constructor(protected garantiaService: GarantiaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.garantiaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('garantiaListModification');
      this.activeModal.close();
    });
  }
}
