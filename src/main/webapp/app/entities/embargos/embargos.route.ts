import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEmbargos, Embargos } from 'app/shared/model/embargos.model';
import { EmbargosService } from './embargos.service';
import { EmbargosComponent } from './embargos.component';
import { EmbargosDetailComponent } from './embargos-detail.component';
import { EmbargosUpdateComponent } from './embargos-update.component';

@Injectable({ providedIn: 'root' })
export class EmbargosResolve implements Resolve<IEmbargos> {
  constructor(private service: EmbargosService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEmbargos> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((embargos: HttpResponse<Embargos>) => {
          if (embargos.body) {
            return of(embargos.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Embargos());
  }
}

export const embargosRoute: Routes = [
  {
    path: '',
    component: EmbargosComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'rrhh2App.embargos.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: EmbargosDetailComponent,
    resolve: {
      embargos: EmbargosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rrhh2App.embargos.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: EmbargosUpdateComponent,
    resolve: {
      embargos: EmbargosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rrhh2App.embargos.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: EmbargosUpdateComponent,
    resolve: {
      embargos: EmbargosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rrhh2App.embargos.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
