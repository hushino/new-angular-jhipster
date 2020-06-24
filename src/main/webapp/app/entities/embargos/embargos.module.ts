import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Rrhh2SharedModule } from 'app/shared/shared.module';
import { EmbargosComponent } from './embargos.component';
import { EmbargosDetailComponent } from './embargos-detail.component';
import { EmbargosUpdateComponent } from './embargos-update.component';
import { EmbargosDeletePopupComponent, EmbargosDeleteDialogComponent } from './embargos-delete-dialog.component';
import { embargosRoute, embargosPopupRoute } from './embargos.route';

const ENTITY_STATES = [...embargosRoute, ...embargosPopupRoute];

@NgModule({
  imports: [Rrhh2SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    EmbargosComponent,
    EmbargosDetailComponent,
    EmbargosUpdateComponent,
    EmbargosDeleteDialogComponent,
    EmbargosDeletePopupComponent
  ],
  entryComponents: [EmbargosDeleteDialogComponent]
})
export class Rrhh2EmbargosModule {}
