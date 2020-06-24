import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAltasAscensosBajas } from 'app/shared/model/altas-ascensos-bajas.model';
import { AltasAscensosBajasService } from './altas-ascensos-bajas.service';

@Component({
  templateUrl: './altas-ascensos-bajas-delete-dialog.component.html',
})
export class AltasAscensosBajasDeleteDialogComponent {
  altasAscensosBajas?: IAltasAscensosBajas;

  constructor(
    protected altasAscensosBajasService: AltasAscensosBajasService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.altasAscensosBajasService.delete(id).subscribe(() => {
      this.eventManager.broadcast('altasAscensosBajasListModification');
      this.activeModal.close();
    });
  }
}
