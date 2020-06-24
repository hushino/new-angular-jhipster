import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IConcpremios, Concpremios } from 'app/shared/model/concpremios.model';
import { ConcpremiosService } from './concpremios.service';
import { ConcpremiosComponent } from './concpremios.component';
import { ConcpremiosDetailComponent } from './concpremios-detail.component';
import { ConcpremiosUpdateComponent } from './concpremios-update.component';

@Injectable({ providedIn: 'root' })
export class ConcpremiosResolve implements Resolve<IConcpremios> {
  constructor(private service: ConcpremiosService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IConcpremios> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((concpremios: HttpResponse<Concpremios>) => {
          if (concpremios.body) {
            return of(concpremios.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Concpremios());
  }
}

export const concpremiosRoute: Routes = [
  {
    path: '',
    component: ConcpremiosComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'rrhh2App.concpremios.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ConcpremiosDetailComponent,
    resolve: {
      concpremios: ConcpremiosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rrhh2App.concpremios.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ConcpremiosUpdateComponent,
    resolve: {
      concpremios: ConcpremiosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rrhh2App.concpremios.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ConcpremiosUpdateComponent,
    resolve: {
      concpremios: ConcpremiosResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rrhh2App.concpremios.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
