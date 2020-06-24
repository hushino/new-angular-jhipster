import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConcpremios } from 'app/shared/model/concpremios.model';

@Component({
  selector: 'jhi-concpremios-detail',
  templateUrl: './concpremios-detail.component.html',
})
export class ConcpremiosDetailComponent implements OnInit {
  concpremios: IConcpremios | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ concpremios }) => (this.concpremios = concpremios));
  }

  previousState(): void {
    window.history.back();
  }
}
