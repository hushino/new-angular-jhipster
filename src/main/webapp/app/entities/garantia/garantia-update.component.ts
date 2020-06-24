import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IGarantia, Garantia } from 'app/shared/model/garantia.model';
import { GarantiaService } from './garantia.service';
import { IPersona } from 'app/shared/model/persona.model';
import { PersonaService } from 'app/entities/persona/persona.service';

@Component({
  selector: 'jhi-garantia-update',
  templateUrl: './garantia-update.component.html',
})
export class GarantiaUpdateComponent implements OnInit {
  isSaving = false;
  personas: IPersona[] = [];
  presentadaFechaDp: any;

  editForm = this.fb.group({
    id: [],
    presentadaFecha: [],
    garantia: [],
    observaciones: [],
    persona: [],
  });

  constructor(
    protected garantiaService: GarantiaService,
    protected personaService: PersonaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ garantia }) => {
      this.updateForm(garantia);

      this.personaService.query().subscribe((res: HttpResponse<IPersona[]>) => (this.personas = res.body || []));
    });
  }

  updateForm(garantia: IGarantia): void {
    this.editForm.patchValue({
      id: garantia.id,
      presentadaFecha: garantia.presentadaFecha,
      garantia: garantia.garantia,
      observaciones: garantia.observaciones,
      persona: garantia.persona,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const garantia = this.createFromForm();
    if (garantia.id !== undefined) {
      this.subscribeToSaveResponse(this.garantiaService.update(garantia));
    } else {
      this.subscribeToSaveResponse(this.garantiaService.create(garantia));
    }
  }

  private createFromForm(): IGarantia {
    return {
      ...new Garantia(),
      id: this.editForm.get(['id'])!.value,
      presentadaFecha: this.editForm.get(['presentadaFecha'])!.value,
      garantia: this.editForm.get(['garantia'])!.value,
      observaciones: this.editForm.get(['observaciones'])!.value,
      persona: this.editForm.get(['persona'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGarantia>>): void {
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
