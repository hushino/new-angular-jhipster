import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ILicencia, Licencia } from 'app/shared/model/licencia.model';
import { LicenciaService } from './licencia.service';
import { LicenciaComponent } from './licencia.component';
import { LicenciaDetailComponent } from './licencia-detail.component';
import { LicenciaUpdateComponent } from './licencia-update.component';

@Injectable({ providedIn: 'root' })
export class LicenciaResolve implements Resolve<ILicencia> {
  constructor(private service: LicenciaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILicencia> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((licencia: HttpResponse<Licencia>) => {
          if (licencia.body) {
            return of(licencia.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Licencia());
  }
}

export const licenciaRoute: Routes = [
  {
    path: '',
    component: LicenciaComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'rrhh2App.licencia.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: LicenciaDetailComponent,
    resolve: {
      licencia: LicenciaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rrhh2App.licencia.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: LicenciaUpdateComponent,
    resolve: {
      licencia: LicenciaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rrhh2App.licencia.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: LicenciaUpdateComponent,
    resolve: {
      licencia: LicenciaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rrhh2App.licencia.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
