import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGarantia } from 'app/shared/model/garantia.model';

@Component({
  selector: 'jhi-garantia-detail',
  templateUrl: './garantia-detail.component.html',
})
export class GarantiaDetailComponent implements OnInit {
  garantia: IGarantia | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ garantia }) => (this.garantia = garantia));
  }

  previousState(): void {
    window.history.back();
  }
}
