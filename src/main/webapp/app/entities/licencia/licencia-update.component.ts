import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ILicencia, Licencia } from 'app/shared/model/licencia.model';
import { LicenciaService } from './licencia.service';
import { IPersona } from 'app/shared/model/persona.model';
import { PersonaService } from 'app/entities/persona/persona.service';

@Component({
  selector: 'jhi-licencia-update',
  templateUrl: './licencia-update.component.html',
})
export class LicenciaUpdateComponent implements OnInit {
  isSaving = false;
  personas: IPersona[] = [];
  fechaLicenciaDp: any;

  editForm = this.fb.group({
    id: [],
    fechaLicencia: [],
    referencias: [],
    numeroDeDias: [],
    observaciones: [],
    usuariosMod: [],
    persona: [],
  });

  constructor(
    protected licenciaService: LicenciaService,
    protected personaService: PersonaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ licencia }) => {
      this.updateForm(licencia);

      this.personaService.query().subscribe((res: HttpResponse<IPersona[]>) => (this.personas = res.body || []));
    });
  }

  updateForm(licencia: ILicencia): void {
    this.editForm.patchValue({
      id: licencia.id,
      fechaLicencia: licencia.fechaLicencia,
      referencias: licencia.referencias,
      numeroDeDias: licencia.numeroDeDias,
      observaciones: licencia.observaciones,
      usuariosMod: licencia.usuariosMod,
      persona: licencia.persona,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const licencia = this.createFromForm();
    if (licencia.id !== undefined) {
      this.subscribeToSaveResponse(this.licenciaService.update(licencia));
    } else {
      this.subscribeToSaveResponse(this.licenciaService.create(licencia));
    }
  }

  private createFromForm(): ILicencia {
    return {
      ...new Licencia(),
      id: this.editForm.get(['id'])!.value,
      fechaLicencia: this.editForm.get(['fechaLicencia'])!.value,
      referencias: this.editForm.get(['referencias'])!.value,
      numeroDeDias: this.editForm.get(['numeroDeDias'])!.value,
      observaciones: this.editForm.get(['observaciones'])!.value,
      usuariosMod: this.editForm.get(['usuariosMod'])!.value,
      persona: this.editForm.get(['persona'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILicencia>>): void {
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
