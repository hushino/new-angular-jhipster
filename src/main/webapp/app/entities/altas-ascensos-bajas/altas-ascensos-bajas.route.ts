import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAltasAscensosBajas, AltasAscensosBajas } from 'app/shared/model/altas-ascensos-bajas.model';
import { AltasAscensosBajasService } from './altas-ascensos-bajas.service';
import { AltasAscensosBajasComponent } from './altas-ascensos-bajas.component';
import { AltasAscensosBajasDetailComponent } from './altas-ascensos-bajas-detail.component';
import { AltasAscensosBajasUpdateComponent } from './altas-ascensos-bajas-update.component';

@Injectable({ providedIn: 'root' })
export class AltasAscensosBajasResolve implements Resolve<IAltasAscensosBajas> {
  constructor(private service: AltasAscensosBajasService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAltasAscensosBajas> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((altasAscensosBajas: HttpResponse<AltasAscensosBajas>) => {
          if (altasAscensosBajas.body) {
            return of(altasAscensosBajas.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AltasAscensosBajas());
  }
}

export const altasAscensosBajasRoute: Routes = [
  {
    path: '',
    component: AltasAscensosBajasComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'rrhh2App.altasAscensosBajas.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AltasAscensosBajasDetailComponent,
    resolve: {
      altasAscensosBajas: AltasAscensosBajasResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rrhh2App.altasAscensosBajas.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AltasAscensosBajasUpdateComponent,
    resolve: {
      altasAscensosBajas: AltasAscensosBajasResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rrhh2App.altasAscensosBajas.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AltasAscensosBajasUpdateComponent,
    resolve: {
      altasAscensosBajas: AltasAscensosBajasResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rrhh2App.altasAscensosBajas.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
