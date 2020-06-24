import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPenasDisciplinariasSufridas, PenasDisciplinariasSufridas } from 'app/shared/model/penas-disciplinarias-sufridas.model';
import { PenasDisciplinariasSufridasService } from './penas-disciplinarias-sufridas.service';
import { PenasDisciplinariasSufridasComponent } from './penas-disciplinarias-sufridas.component';
import { PenasDisciplinariasSufridasDetailComponent } from './penas-disciplinarias-sufridas-detail.component';
import { PenasDisciplinariasSufridasUpdateComponent } from './penas-disciplinarias-sufridas-update.component';

@Injectable({ providedIn: 'root' })
export class PenasDisciplinariasSufridasResolve implements Resolve<IPenasDisciplinariasSufridas> {
  constructor(private service: PenasDisciplinariasSufridasService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPenasDisciplinariasSufridas> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((penasDisciplinariasSufridas: HttpResponse<PenasDisciplinariasSufridas>) => {
          if (penasDisciplinariasSufridas.body) {
            return of(penasDisciplinariasSufridas.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new PenasDisciplinariasSufridas());
  }
}

export const penasDisciplinariasSufridasRoute: Routes = [
  {
    path: '',
    component: PenasDisciplinariasSufridasComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'rrhh2App.penasDisciplinariasSufridas.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PenasDisciplinariasSufridasDetailComponent,
    resolve: {
      penasDisciplinariasSufridas: PenasDisciplinariasSufridasResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rrhh2App.penasDisciplinariasSufridas.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PenasDisciplinariasSufridasUpdateComponent,
    resolve: {
      penasDisciplinariasSufridas: PenasDisciplinariasSufridasResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rrhh2App.penasDisciplinariasSufridas.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PenasDisciplinariasSufridasUpdateComponent,
    resolve: {
      penasDisciplinariasSufridas: PenasDisciplinariasSufridasResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rrhh2App.penasDisciplinariasSufridas.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
