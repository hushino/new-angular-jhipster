import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Rrhh2SharedModule } from 'app/shared/shared.module';
import { PenasDisciplinariasSufridasComponent } from './penas-disciplinarias-sufridas.component';
import { PenasDisciplinariasSufridasDetailComponent } from './penas-disciplinarias-sufridas-detail.component';
import { PenasDisciplinariasSufridasUpdateComponent } from './penas-disciplinarias-sufridas-update.component';
import { PenasDisciplinariasSufridasDeleteDialogComponent } from './penas-disciplinarias-sufridas-delete-dialog.component';
import { penasDisciplinariasSufridasRoute } from './penas-disciplinarias-sufridas.route';

@NgModule({
  imports: [Rrhh2SharedModule, RouterModule.forChild(penasDisciplinariasSufridasRoute)],
  declarations: [
    PenasDisciplinariasSufridasComponent,
    PenasDisciplinariasSufridasDetailComponent,
    PenasDisciplinariasSufridasUpdateComponent,
    PenasDisciplinariasSufridasDeleteDialogComponent,
  ],
  entryComponents: [PenasDisciplinariasSufridasDeleteDialogComponent],
})
export class Rrhh2PenasDisciplinariasSufridasModule {}
