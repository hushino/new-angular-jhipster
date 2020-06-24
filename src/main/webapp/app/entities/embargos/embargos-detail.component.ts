import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmbargos } from 'app/shared/model/embargos.model';

@Component({
  selector: 'jhi-embargos-detail',
  templateUrl: './embargos-detail.component.html',
})
export class EmbargosDetailComponent implements OnInit {
  embargos: IEmbargos | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ embargos }) => (this.embargos = embargos));
  }

  previousState(): void {
    window.history.back();
  }
}
