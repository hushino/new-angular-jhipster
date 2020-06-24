import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAltasAscensosBajas } from 'app/shared/model/altas-ascensos-bajas.model';

type EntityResponseType = HttpResponse<IAltasAscensosBajas>;
type EntityArrayResponseType = HttpResponse<IAltasAscensosBajas[]>;

@Injectable({ providedIn: 'root' })
export class AltasAscensosBajasService {
  public resourceUrl = SERVER_API_URL + 'api/altas-ascensos-bajas';

  constructor(protected http: HttpClient) {}

  create(altasAscensosBajas: IAltasAscensosBajas): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(altasAscensosBajas);
    return this.http
      .post<IAltasAscensosBajas>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(altasAscensosBajas: IAltasAscensosBajas): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(altasAscensosBajas);
    return this.http
      .put<IAltasAscensosBajas>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IAltasAscensosBajas>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IAltasAscensosBajas[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(altasAscensosBajas: IAltasAscensosBajas): IAltasAscensosBajas {
    const copy: IAltasAscensosBajas = Object.assign({}, altasAscensosBajas, {
      fecha: altasAscensosBajas.fecha && altasAscensosBajas.fecha.isValid() ? altasAscensosBajas.fecha.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecha = res.body.fecha ? moment(res.body.fecha) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((altasAscensosBajas: IAltasAscensosBajas) => {
        altasAscensosBajas.fecha = altasAscensosBajas.fecha ? moment(altasAscensosBajas.fecha) : undefined;
      });
    }
    return res;
  }
}
