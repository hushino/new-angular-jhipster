import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOtrosServiciosPrestados } from 'app/shared/model/otros-servicios-prestados.model';
import { OtrosServiciosPrestadosService } from './otros-servicios-prestados.service';

@Component({
  templateUrl: './otros-servicios-prestados-delete-dialog.component.html',
})
export class OtrosServiciosPrestadosDeleteDialogComponent {
  otrosServiciosPrestados?: IOtrosServiciosPrestados;

  constructor(
    protected otrosServiciosPrestadosService: OtrosServiciosPrestadosService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.otrosServiciosPrestadosService.delete(id).subscribe(() => {
      this.eventManager.broadcast('otrosServiciosPrestadosListModification');
      this.activeModal.close();
    });
  }
}
