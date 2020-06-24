import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ILicencia } from 'app/shared/model/licencia.model';

@Component({
  selector: 'jhi-licencia-detail',
  templateUrl: './licencia-detail.component.html',
})
export class LicenciaDetailComponent implements OnInit {
  licencia: ILicencia | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ licencia }) => (this.licencia = licencia));
  }

  previousState(): void {
    window.history.back();
  }
}
