import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOtrosServiciosPrestados } from 'app/shared/model/otros-servicios-prestados.model';

@Component({
  selector: 'jhi-otros-servicios-prestados-detail',
  templateUrl: './otros-servicios-prestados-detail.component.html',
})
export class OtrosServiciosPrestadosDetailComponent implements OnInit {
  otrosServiciosPrestados: IOtrosServiciosPrestados | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ otrosServiciosPrestados }) => (this.otrosServiciosPrestados = otrosServiciosPrestados));
  }

  previousState(): void {
    window.history.back();
  }
}
