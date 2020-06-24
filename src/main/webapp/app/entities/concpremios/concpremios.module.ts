import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Rrhh2SharedModule } from 'app/shared/shared.module';
import { ConcpremiosComponent } from './concpremios.component';
import { ConcpremiosDetailComponent } from './concpremios-detail.component';
import { ConcpremiosUpdateComponent } from './concpremios-update.component';
import { ConcpremiosDeleteDialogComponent } from './concpremios-delete-dialog.component';
import { concpremiosRoute } from './concpremios.route';

@NgModule({
  imports: [Rrhh2SharedModule, RouterModule.forChild(concpremiosRoute)],
  declarations: [ConcpremiosComponent, ConcpremiosDetailComponent, ConcpremiosUpdateComponent, ConcpremiosDeleteDialogComponent],
  entryComponents: [ConcpremiosDeleteDialogComponent],
})
export class Rrhh2ConcpremiosModule {}
