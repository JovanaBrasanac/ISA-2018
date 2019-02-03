import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISeat } from 'app/shared/model/seat.model';

type EntityResponseType = HttpResponse<ISeat>;
type EntityArrayResponseType = HttpResponse<ISeat[]>;

@Injectable({ providedIn: 'root' })
export class SeatService {
    public resourceUrl = SERVER_API_URL + 'api/seats';

    constructor(protected http: HttpClient) {}

    create(seat: ISeat): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(seat);
        return this.http
            .post<ISeat>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(seat: ISeat): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(seat);
        return this.http
            .put<ISeat>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ISeat>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISeat[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(seat: ISeat): ISeat {
        const copy: ISeat = Object.assign({}, seat, {
            dateOfSale: seat.dateOfSale != null && seat.dateOfSale.isValid() ? seat.dateOfSale.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.dateOfSale = res.body.dateOfSale != null ? moment(res.body.dateOfSale) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((seat: ISeat) => {
                seat.dateOfSale = seat.dateOfSale != null ? moment(seat.dateOfSale) : null;
            });
        }
        return res;
    }
}
