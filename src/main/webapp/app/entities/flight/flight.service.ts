import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFlight } from 'app/shared/model/flight.model';

type EntityResponseType = HttpResponse<IFlight>;
type EntityArrayResponseType = HttpResponse<IFlight[]>;

@Injectable({ providedIn: 'root' })
export class FlightService {
    public resourceUrl = SERVER_API_URL + 'api/flights';

    constructor(protected http: HttpClient) {}

    create(flight: IFlight): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(flight);
        return this.http
            .post<IFlight>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(flight: IFlight): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(flight);
        return this.http
            .put<IFlight>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IFlight>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFlight[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(flight: IFlight): IFlight {
        const copy: IFlight = Object.assign({}, flight, {
            startDate: flight.startDate != null && flight.startDate.isValid() ? flight.startDate.format(DATE_FORMAT) : null,
            endDate: flight.endDate != null && flight.endDate.isValid() ? flight.endDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
            res.body.endDate = res.body.endDate != null ? moment(res.body.endDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((flight: IFlight) => {
                flight.startDate = flight.startDate != null ? moment(flight.startDate) : null;
                flight.endDate = flight.endDate != null ? moment(flight.endDate) : null;
            });
        }
        return res;
    }
}
