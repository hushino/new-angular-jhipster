import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Rrhh2SharedModule } from 'app/shared/shared.module';
import { OtrosServiciosPrestadosComponent } from './otros-servicios-prestados.component';
import { OtrosServiciosPrestadosDetailComponent } from './otros-servicios-prestados-detail.component';
import { OtrosServiciosPrestadosUpdateComponent } from './otros-servicios-prestados-update.component';
import { OtrosServiciosPrestadosDeleteDialogComponent } from './otros-servicios-prestados-delete-dialog.component';
import { otrosServiciosPrestadosRoute } from './otros-servicios-prestados.route';

@NgModule({
  imports: [Rrhh2SharedModule, RouterModule.forChild(otrosServiciosPrestadosRoute)],
  declarations: [
    OtrosServiciosPrestadosComponent,
    OtrosServiciosPrestadosDetailComponent,
    OtrosServiciosPrestadosUpdateComponent,
    OtrosServiciosPrestadosDeleteDialogComponent,
  ],
  entryComponents: [OtrosServiciosPrestadosDeleteDialogComponent],
})
export class Rrhh2OtrosServiciosPrestadosModule {}
