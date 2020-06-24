import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IGarantia } from 'app/shared/model/garantia.model';

type EntityResponseType = HttpResponse<IGarantia>;
type EntityArrayResponseType = HttpResponse<IGarantia[]>;

@Injectable({ providedIn: 'root' })
export class GarantiaService {
  public resourceUrl = SERVER_API_URL + 'api/garantias';

  constructor(protected http: HttpClient) {}

  create(garantia: IGarantia): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(garantia);
    return this.http
      .post<IGarantia>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(garantia: IGarantia): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(garantia);
    return this.http
      .put<IGarantia>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IGarantia>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IGarantia[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(garantia: IGarantia): IGarantia {
    const copy: IGarantia = Object.assign({}, garantia, {
      presentadaFecha:
        garantia.presentadaFecha && garantia.presentadaFecha.isValid() ? garantia.presentadaFecha.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.presentadaFecha = res.body.presentadaFecha ? moment(res.body.presentadaFecha) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((garantia: IGarantia) => {
        garantia.presentadaFecha = garantia.presentadaFecha ? moment(garantia.presentadaFecha) : undefined;
      });
    }
    return res;
  }
}
