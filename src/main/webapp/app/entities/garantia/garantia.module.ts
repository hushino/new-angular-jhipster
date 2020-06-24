import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Rrhh2SharedModule } from 'app/shared/shared.module';
import { GarantiaComponent } from './garantia.component';
import { GarantiaDetailComponent } from './garantia-detail.component';
import { GarantiaUpdateComponent } from './garantia-update.component';
import { GarantiaDeleteDialogComponent } from './garantia-delete-dialog.component';
import { garantiaRoute } from './garantia.route';

@NgModule({
  imports: [Rrhh2SharedModule, RouterModule.forChild(garantiaRoute)],
  declarations: [GarantiaComponent, GarantiaDetailComponent, GarantiaUpdateComponent, GarantiaDeleteDialogComponent],
  entryComponents: [GarantiaDeleteDialogComponent],
})
export class Rrhh2GarantiaModule {}
