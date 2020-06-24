import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEmbargos } from 'app/shared/model/embargos.model';
import { EmbargosService } from './embargos.service';

@Component({
  templateUrl: './embargos-delete-dialog.component.html',
})
export class EmbargosDeleteDialogComponent {
  embargos?: IEmbargos;

  constructor(protected embargosService: EmbargosService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.embargosService.delete(id).subscribe(() => {
      this.eventManager.broadcast('embargosListModification');
      this.activeModal.close();
    });
  }
}
