import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { LicenciaService } from 'app/entities/licencia/licencia.service';
import { ILicencia, Licencia } from 'app/shared/model/licencia.model';

describe('Service Tests', () => {
  describe('Licencia Service', () => {
    let injector: TestBed;
    let service: LicenciaService;
    let httpMock: HttpTestingController;
    let elemDefault: ILicencia;
    let expectedResult: ILicencia | ILicencia[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(LicenciaService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Licencia(0, currentDate, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fechaLicencia: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Licencia', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fechaLicencia: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaLicencia: currentDate,
          },
          returnedFromService
        );

        service.create(new Licencia()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Licencia', () => {
        const returnedFromService = Object.assign(
          {
            fechaLicencia: currentDate.format(DATE_FORMAT),
            referencias: 'BBBBBB',
            numeroDeDias: 'BBBBBB',
            observaciones: 'BBBBBB',
            usuariosMod: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaLicencia: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Licencia', () => {
        const returnedFromService = Object.assign(
          {
            fechaLicencia: currentDate.format(DATE_FORMAT),
            referencias: 'BBBBBB',
            numeroDeDias: 'BBBBBB',
            observaciones: 'BBBBBB',
            usuariosMod: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaLicencia: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Licencia', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
