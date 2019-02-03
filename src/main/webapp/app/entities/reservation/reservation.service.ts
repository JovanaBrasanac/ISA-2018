import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IReservation } from 'app/shared/model/reservation.model';

type EntityResponseType = HttpResponse<IReservation>;
type EntityArrayResponseType = HttpResponse<IReservation[]>;

@Injectable({ providedIn: 'root' })
export class ReservationService {
    public resourceUrl = SERVER_API_URL + 'api/reservations';

    constructor(protected http: HttpClient) {}

    create(reservation: IReservation): Observable<EntityResponseType> {
        return this.http.post<IReservation>(this.resourceUrl, reservation, { observe: 'response' });
    }

    update(reservation: IReservation): Observable<EntityResponseType> {
        return this.http.put<IReservation>(this.resourceUrl, reservation, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IReservation>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IReservation[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
