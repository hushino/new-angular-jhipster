import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IOtrosServiciosPrestados, OtrosServiciosPrestados } from 'app/shared/model/otros-servicios-prestados.model';
import { OtrosServiciosPrestadosService } from './otros-servicios-prestados.service';
import { IPersona } from 'app/shared/model/persona.model';
import { PersonaService } from 'app/entities/persona/persona.service';

@Component({
  selector: 'jhi-otros-servicios-prestados-update',
  templateUrl: './otros-servicios-prestados-update.component.html',
})
export class OtrosServiciosPrestadosUpdateComponent implements OnInit {
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
    protected otrosServiciosPrestadosService: OtrosServiciosPrestadosService,
    protected personaService: PersonaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ otrosServiciosPrestados }) => {
      this.updateForm(otrosServiciosPrestados);

      this.personaService.query().subscribe((res: HttpResponse<IPersona[]>) => (this.personas = res.body || []));
    });
  }

  updateForm(otrosServiciosPrestados: IOtrosServiciosPrestados): void {
    this.editForm.patchValue({
      id: otrosServiciosPrestados.id,
      fecha: otrosServiciosPrestados.fecha,
      referencias: otrosServiciosPrestados.referencias,
      persona: otrosServiciosPrestados.persona,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const otrosServiciosPrestados = this.createFromForm();
    if (otrosServiciosPrestados.id !== undefined) {
      this.subscribeToSaveResponse(this.otrosServiciosPrestadosService.update(otrosServiciosPrestados));
    } else {
      this.subscribeToSaveResponse(this.otrosServiciosPrestadosService.create(otrosServiciosPrestados));
    }
  }

  private createFromForm(): IOtrosServiciosPrestados {
    return {
      ...new OtrosServiciosPrestados(),
      id: this.editForm.get(['id'])!.value,
      fecha: this.editForm.get(['fecha'])!.value,
      referencias: this.editForm.get(['referencias'])!.value,
      persona: this.editForm.get(['persona'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOtrosServiciosPrestados>>): void {
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
