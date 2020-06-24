import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Rrhh2SharedModule } from 'app/shared/shared.module';
import { EmbargosComponent } from './embargos.component';
import { EmbargosDetailComponent } from './embargos-detail.component';
import { EmbargosUpdateComponent } from './embargos-update.component';
import { EmbargosDeleteDialogComponent } from './embargos-delete-dialog.component';
import { embargosRoute } from './embargos.route';

@NgModule({
  imports: [Rrhh2SharedModule, RouterModule.forChild(embargosRoute)],
  declarations: [EmbargosComponent, EmbargosDetailComponent, EmbargosUpdateComponent, EmbargosDeleteDialogComponent],
  entryComponents: [EmbargosDeleteDialogComponent],
})
export class Rrhh2EmbargosModule {}
