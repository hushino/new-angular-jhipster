import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IPenasDisciplinariasSufridas, PenasDisciplinariasSufridas } from 'app/shared/model/penas-disciplinarias-sufridas.model';
import { PenasDisciplinariasSufridasService } from './penas-disciplinarias-sufridas.service';
import { IPersona } from 'app/shared/model/persona.model';
import { PersonaService } from 'app/entities/persona/persona.service';

@Component({
  selector: 'jhi-penas-disciplinarias-sufridas-update',
  templateUrl: './penas-disciplinarias-sufridas-update.component.html',
})
export class PenasDisciplinariasSufridasUpdateComponent implements OnInit {
  isSaving = false;
  personas: IPersona[] = [];
  fechaDp: any;

  editForm = this.fb.group({
    id: [],
    fecha: [],
    expediente: [],
    referencias: [],
    persona: [],
  });

  constructor(
    protected penasDisciplinariasSufridasService: PenasDisciplinariasSufridasService,
    protected personaService: PersonaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ penasDisciplinariasSufridas }) => {
      this.updateForm(penasDisciplinariasSufridas);

      this.personaService.query().subscribe((res: HttpResponse<IPersona[]>) => (this.personas = res.body || []));
    });
  }

  updateForm(penasDisciplinariasSufridas: IPenasDisciplinariasSufridas): void {
    this.editForm.patchValue({
      id: penasDisciplinariasSufridas.id,
      fecha: penasDisciplinariasSufridas.fecha,
      expediente: penasDisciplinariasSufridas.expediente,
      referencias: penasDisciplinariasSufridas.referencias,
      persona: penasDisciplinariasSufridas.persona,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const penasDisciplinariasSufridas = this.createFromForm();
    if (penasDisciplinariasSufridas.id !== undefined) {
      this.subscribeToSaveResponse(this.penasDisciplinariasSufridasService.update(penasDisciplinariasSufridas));
    } else {
      this.subscribeToSaveResponse(this.penasDisciplinariasSufridasService.create(penasDisciplinariasSufridas));
    }
  }

  private createFromForm(): IPenasDisciplinariasSufridas {
    return {
      ...new PenasDisciplinariasSufridas(),
      id: this.editForm.get(['id'])!.value,
      fecha: this.editForm.get(['fecha'])!.value,
      expediente: this.editForm.get(['expediente'])!.value,
      referencias: this.editForm.get(['referencias'])!.value,
      persona: this.editForm.get(['persona'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPenasDisciplinariasSufridas>>): void {
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
