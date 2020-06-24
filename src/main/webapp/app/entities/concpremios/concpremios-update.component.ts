import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IConcpremios, Concpremios } from 'app/shared/model/concpremios.model';
import { ConcpremiosService } from './concpremios.service';
import { IPersona } from 'app/shared/model/persona.model';
import { PersonaService } from 'app/entities/persona/persona.service';

@Component({
  selector: 'jhi-concpremios-update',
  templateUrl: './concpremios-update.component.html',
})
export class ConcpremiosUpdateComponent implements OnInit {
  isSaving = false;
  personas: IPersona[] = [];
  fechaDp: any;

  editForm = this.fb.group({
    id: [],
    fecha: [],
    referencias: [],
    persona: [],
  });

  constructor(
    protected concpremiosService: ConcpremiosService,
    protected personaService: PersonaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ concpremios }) => {
      this.updateForm(concpremios);

      this.personaService.query().subscribe((res: HttpResponse<IPersona[]>) => (this.personas = res.body || []));
    });
  }

  updateForm(concpremios: IConcpremios): void {
    this.editForm.patchValue({
      id: concpremios.id,
      fecha: concpremios.fecha,
      referencias: concpremios.referencias,
      persona: concpremios.persona,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const concpremios = this.createFromForm();
    if (concpremios.id !== undefined) {
      this.subscribeToSaveResponse(this.concpremiosService.update(concpremios));
    } else {
      this.subscribeToSaveResponse(this.concpremiosService.create(concpremios));
    }
  }

  private createFromForm(): IConcpremios {
    return {
      ...new Concpremios(),
      id: this.editForm.get(['id'])!.value,
      fecha: this.editForm.get(['fecha'])!.value,
      referencias: this.editForm.get(['referencias'])!.value,
      persona: this.editForm.get(['persona'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IConcpremios>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IPersona): any {
    return item.id;
  }
}
