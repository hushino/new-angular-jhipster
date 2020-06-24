import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Rrhh2SharedModule } from 'app/shared/shared.module';
import { AltasAscensosBajasComponent } from './altas-ascensos-bajas.component';
import { AltasAscensosBajasDetailComponent } from './altas-ascensos-bajas-detail.component';
import { AltasAscensosBajasUpdateComponent } from './altas-ascensos-bajas-update.component';
import { AltasAscensosBajasDeleteDialogComponent } from './altas-ascensos-bajas-delete-dialog.component';
import { altasAscensosBajasRoute } from './altas-ascensos-bajas.route';

@NgModule({
  imports: [Rrhh2SharedModule, RouterModule.forChild(altasAscensosBajasRoute)],
  declarations: [
    AltasAscensosBajasComponent,
    AltasAscensosBajasDetailComponent,
    AltasAscensosBajasUpdateComponent,
    AltasAscensosBajasDeleteDialogComponent,
  ],
  entryComponents: [AltasAscensosBajasDeleteDialogComponent],
})
export class Rrhh2AltasAscensosBajasModule {}
