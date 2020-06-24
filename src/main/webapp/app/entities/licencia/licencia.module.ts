import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Rrhh2SharedModule } from 'app/shared/shared.module';
import { LicenciaComponent } from './licencia.component';
import { LicenciaDetailComponent } from './licencia-detail.component';
import { LicenciaUpdateComponent } from './licencia-update.component';
import { LicenciaDeleteDialogComponent } from './licencia-delete-dialog.component';
import { licenciaRoute } from './licencia.route';

@NgModule({
  imports: [Rrhh2SharedModule, RouterModule.forChild(licenciaRoute)],
  declarations: [LicenciaComponent, LicenciaDetailComponent, LicenciaUpdateComponent, LicenciaDeleteDialogComponent],
  entryComponents: [LicenciaDeleteDialogComponent],
})
export class Rrhh2LicenciaModule {}
