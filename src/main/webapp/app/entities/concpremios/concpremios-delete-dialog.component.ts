import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IConcpremios } from 'app/shared/model/concpremios.model';
import { ConcpremiosService } from './concpremios.service';

@Component({
  templateUrl: './concpremios-delete-dialog.component.html',
})
export class ConcpremiosDeleteDialogComponent {
  concpremios?: IConcpremios;

  constructor(
    protected concpremiosService: ConcpremiosService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.concpremiosService.delete(id).subscribe(() => {
      this.eventManager.broadcast('concpremiosListModification');
      this.activeModal.close();
    });
  }
}
