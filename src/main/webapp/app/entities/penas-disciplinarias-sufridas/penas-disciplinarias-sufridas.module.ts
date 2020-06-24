import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Rrhh2SharedModule } from 'app/shared/shared.module';
import { PenasDisciplinariasSufridasComponent } from './penas-disciplinarias-sufridas.component';
import { PenasDisciplinariasSufridasDetailComponent } from './penas-disciplinarias-sufridas-detail.component';
import { PenasDisciplinariasSufridasUpdateComponent } from './penas-disciplinarias-sufridas-update.component';
import {
  PenasDisciplinariasSufridasDeletePopupComponent,
  PenasDisciplinariasSufridasDeleteDialogComponent
} from './penas-disciplinarias-sufridas-delete-dialog.component';
import { penasDisciplinariasSufridasRoute, penasDisciplinariasSufridasPopupRoute } from './penas-disciplinarias-sufridas.route';

const ENTITY_STATES = [...penasDisciplinariasSufridasRoute, ...penasDisciplinariasSufridasPopupRoute];

@NgModule({
  imports: [Rrhh2SharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PenasDisciplinariasSufridasComponent,
    PenasDisciplinariasSufridasDetailComponent,
    PenasDisciplinariasSufridasUpdateComponent,
    PenasDisciplinariasSufridasDeleteDialogComponent,
    PenasDisciplinariasSufridasDeletePopupComponent
  ],
  entryComponents: [PenasDisciplinariasSufridasDeleteDialogComponent]
})
export class Rrhh2PenasDisciplinariasSufridasModule {}
