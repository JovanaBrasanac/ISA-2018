import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAirportReview } from 'app/shared/model/airport-review.model';

type EntityResponseType = HttpResponse<IAirportReview>;
type EntityArrayResponseType = HttpResponse<IAirportReview[]>;

@Injectable({ providedIn: 'root' })
export class AirportReviewService {
    public resourceUrl = SERVER_API_URL + 'api/airport-reviews';

    constructor(protected http: HttpClient) {}

    create(airportReview: IAirportReview): Observable<EntityResponseType> {
        return this.http.post<IAirportReview>(this.resourceUrl, airportReview, { observe: 'response' });
    }

    update(airportReview: IAirportReview): Observable<EntityResponseType> {
        return this.http.put<IAirportReview>(this.resourceUrl, airportReview, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAirportReview>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAirportReview[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
