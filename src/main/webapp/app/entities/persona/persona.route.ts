import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPersona, Persona } from 'app/shared/model/persona.model';
import { PersonaService } from './persona.service';
import { PersonaComponent } from './persona.component';
import { PersonaDetailComponent } from './persona-detail.component';
import { PersonaUpdateComponent } from './persona-update.component';

@Injectable({ providedIn: 'root' })
export class PersonaResolve implements Resolve<IPersona> {
  constructor(private service: PersonaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPersona> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((persona: HttpResponse<Persona>) => {
          if (persona.body) {
            return of(persona.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Persona());
  }
}

export const personaRoute: Routes = [
  {
    path: '',
    component: PersonaComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'rrhh2App.persona.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PersonaDetailComponent,
    resolve: {
      persona: PersonaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rrhh2App.persona.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PersonaUpdateComponent,
    resolve: {
      persona: PersonaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rrhh2App.persona.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PersonaUpdateComponent,
    resolve: {
      persona: PersonaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'rrhh2App.persona.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
