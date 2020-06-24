import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IGarantia, Garantia } from 'app/shared/model/garantia.model';
import { GarantiaService } from './garantia.service';
import { GarantiaComponent } from './garantia.component';
import { GarantiaDetailComponent } from './garantia-detail.component';
import { GarantiaUpdateComponent } from './garantia-update.component';

@Injectable({ providedIn: 'root' })
export class GarantiaResolve implements Resolve<IGarantia> {
  constructor(private service: GarantiaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGarantia> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((garantia: HttpResponse<Garantia>) => {
          if (garantia.body) {
            return of(garantia.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Garantia());
  }
}

export const garantiaRoute: Routes = [
  {
    path: '',
    component: GarantiaComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'rrhh2App.garantia.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: GarantiaDetailComponent,
    resolve: {
      garantia: GarantiaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rrhh2App.garantia.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: GarantiaUpdateComponent,
    resolve: {
      garantia: GarantiaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rrhh2App.garantia.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: GarantiaUpdateComponent,
    resolve: {
      garantia: GarantiaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rrhh2App.garantia.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
