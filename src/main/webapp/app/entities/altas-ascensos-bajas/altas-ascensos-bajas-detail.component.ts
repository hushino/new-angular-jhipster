import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAltasAscensosBajas } from 'app/shared/model/altas-ascensos-bajas.model';

@Component({
  selector: 'jhi-altas-ascensos-bajas-detail',
  templateUrl: './altas-ascensos-bajas-detail.component.html',
})
export class AltasAscensosBajasDetailComponent implements OnInit {
  altasAscensosBajas: IAltasAscensosBajas | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ altasAscensosBajas }) => (this.altasAscensosBajas = altasAscensosBajas));
  }

  previousState(): void {
    window.history.back();
  }
}
