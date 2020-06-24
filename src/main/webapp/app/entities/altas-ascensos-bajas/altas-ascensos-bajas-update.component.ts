import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAltasAscensosBajas, AltasAscensosBajas } from 'app/shared/model/altas-ascensos-bajas.model';
import { AltasAscensosBajasService } from './altas-ascensos-bajas.service';
import { IPersona } from 'app/shared/model/persona.model';
import { PersonaService } from 'app/entities/persona/persona.service';

@Component({
  selector: 'jhi-altas-ascensos-bajas-update',
  templateUrl: './altas-ascensos-bajas-update.component.html',
})
export class AltasAscensosBajasUpdateComponent implements OnInit {
  isSaving = false;
  personas: IPersona[] = [];
  fechaDp: any;

  editForm = this.fb.group({
    id: [],
    fecha: [],
    cargo: [],
    observaciones: [],
    expediente: [],
    prestaservicioen: [],
    persona: [],
  });

  constructor(
    protected altasAscensosBajasService: AltasAscensosBajasService,
    protected personaService: PersonaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ altasAscensosBajas }) => {
      this.updateForm(altasAscensosBajas);

      this.personaService.query().subscribe((res: HttpResponse<IPersona[]>) => (this.personas = res.body || []));
    });
  }

  updateForm(altasAscensosBajas: IAltasAscensosBajas): void {
    this.editForm.patchValue({
      id: altasAscensosBajas.id,
      fecha: altasAscensosBajas.fecha,
      cargo: altasAscensosBajas.cargo,
      observaciones: altasAscensosBajas.observaciones,
      expediente: altasAscensosBajas.expediente,
      prestaservicioen: altasAscensosBajas.prestaservicioen,
      persona: altasAscensosBajas.persona,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const altasAscensosBajas = this.createFromForm();
    if (altasAscensosBajas.id !== undefined) {
      this.subscribeToSaveResponse(this.altasAscensosBajasService.update(altasAscensosBajas));
    } else {
      this.subscribeToSaveResponse(this.altasAscensosBajasService.create(altasAscensosBajas));
    }
  }

  private createFromForm(): IAltasAscensosBajas {
    return {
      ...new AltasAscensosBajas(),
      id: this.editForm.get(['id'])!.value,
      fecha: this.editForm.get(['fecha'])!.value,
      cargo: this.editForm.get(['cargo'])!.value,
      observaciones: this.editForm.get(['observaciones'])!.value,
      expediente: this.editForm.get(['expediente'])!.value,
      prestaservicioen: this.editForm.get(['prestaservicioen'])!.value,
      persona: this.editForm.get(['persona'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAltasAscensosBajas>>): void {
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
