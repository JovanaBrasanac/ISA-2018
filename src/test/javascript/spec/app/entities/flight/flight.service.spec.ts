/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { FlightService } from 'app/entities/flight/flight.service';
import { IFlight, Flight } from 'app/shared/model/flight.model';

describe('Service Tests', () => {
    describe('Flight Service', () => {
        let injector: TestBed;
        let service: FlightService;
        let httpMock: HttpTestingController;
        let elemDefault: IFlight;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(FlightService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Flight(
                0,
                'AAAAAAA',
                'AAAAAAA',
                currentDate,
                currentDate,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                0,
                'AAAAAAA',
                'AAAAAAA'
            );
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        startDate: currentDate.format(DATE_FORMAT),
                        endDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Flight', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        startDate: currentDate.format(DATE_FORMAT),
                        endDate: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        startDate: currentDate,
                        endDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Flight(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Flight', async () => {
                const returnedFromService = Object.assign(
                    {
                        startLocation: 'BBBBBB',
                        endLocation: 'BBBBBB',
                        startDate: currentDate.format(DATE_FORMAT),
                        endDate: currentDate.format(DATE_FORMAT),
                        startTime: 'BBBBBB',
                        endTime: 'BBBBBB',
                        timeOfFlight: 'BBBBBB',
                        length: 'BBBBBB',
                        numberOfChanges: 1,
                        locationOfChanges: 'BBBBBB',
                        flightCode: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        startDate: currentDate,
                        endDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Flight', async () => {
                const returnedFromService = Object.assign(
                    {
                        startLocation: 'BBBBBB',
                        endLocation: 'BBBBBB',
                        startDate: currentDate.format(DATE_FORMAT),
                        endDate: currentDate.format(DATE_FORMAT),
                        startTime: 'BBBBBB',
                        endTime: 'BBBBBB',
                        timeOfFlight: 'BBBBBB',
                        length: 'BBBBBB',
                        numberOfChanges: 1,
                        locationOfChanges: 'BBBBBB',
                        flightCode: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        startDate: currentDate,
                        endDate: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a Flight', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
