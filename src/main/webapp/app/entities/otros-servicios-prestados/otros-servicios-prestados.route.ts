import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IOtrosServiciosPrestados, OtrosServiciosPrestados } from 'app/shared/model/otros-servicios-prestados.model';
import { OtrosServiciosPrestadosService } from './otros-servicios-prestados.service';
import { OtrosServiciosPrestadosComponent } from './otros-servicios-prestados.component';
import { OtrosServiciosPrestadosDetailComponent } from './otros-servicios-prestados-detail.component';
import { OtrosServiciosPrestadosUpdateComponent } from './otros-servicios-prestados-update.component';

@Injectable({ providedIn: 'root' })
export class OtrosServiciosPrestadosResolve implements Resolve<IOtrosServiciosPrestados> {
  constructor(private service: OtrosServiciosPrestadosService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOtrosServiciosPrestados> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((otrosServiciosPrestados: HttpResponse<OtrosServiciosPrestados>) => {
          if (otrosServiciosPrestados.body) {
            return of(otrosServiciosPrestados.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new OtrosServiciosPrestados());
  }
}

export const otrosServiciosPrestadosRoute: Routes = [
  {
    path: '',
    component: OtrosServiciosPrestadosComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'rrhh2App.otrosServiciosPrestados.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OtrosServiciosPrestadosDetailComponent,
    resolve: {
      otrosServiciosPrestados: OtrosServiciosPrestadosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rrhh2App.otrosServiciosPrestados.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OtrosServiciosPrestadosUpdateComponent,
    resolve: {
      otrosServiciosPrestados: OtrosServiciosPrestadosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rrhh2App.otrosServiciosPrestados.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OtrosServiciosPrestadosUpdateComponent,
    resolve: {
      otrosServiciosPrestados: OtrosServiciosPrestadosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rrhh2App.otrosServiciosPrestados.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
