import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFlightReview } from 'app/shared/model/flight-review.model';

type EntityResponseType = HttpResponse<IFlightReview>;
type EntityArrayResponseType = HttpResponse<IFlightReview[]>;

@Injectable({ providedIn: 'root' })
export class FlightReviewService {
    public resourceUrl = SERVER_API_URL + 'api/flight-reviews';

    constructor(protected http: HttpClient) {}

    create(flightReview: IFlightReview): Observable<EntityResponseType> {
        return this.http.post<IFlightReview>(this.resourceUrl, flightReview, { observe: 'response' });
    }

    update(flightReview: IFlightReview): Observable<EntityResponseType> {
        return this.http.put<IFlightReview>(this.resourceUrl, flightReview, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IFlightReview>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFlightReview[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
