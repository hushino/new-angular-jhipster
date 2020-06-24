import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPenasDisciplinariasSufridas } from 'app/shared/model/penas-disciplinarias-sufridas.model';
import { PenasDisciplinariasSufridasService } from './penas-disciplinarias-sufridas.service';

@Component({
  templateUrl: './penas-disciplinarias-sufridas-delete-dialog.component.html',
})
export class PenasDisciplinariasSufridasDeleteDialogComponent {
  penasDisciplinariasSufridas?: IPenasDisciplinariasSufridas;

  constructor(
    protected penasDisciplinariasSufridasService: PenasDisciplinariasSufridasService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.penasDisciplinariasSufridasService.delete(id).subscribe(() => {
      this.eventManager.broadcast('penasDisciplinariasSufridasListModification');
      this.activeModal.close();
    });
  }
}
