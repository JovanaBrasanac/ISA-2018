import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAllSeatsConfiguration } from 'app/shared/model/all-seats-configuration.model';

type EntityResponseType = HttpResponse<IAllSeatsConfiguration>;
type EntityArrayResponseType = HttpResponse<IAllSeatsConfiguration[]>;

@Injectable({ providedIn: 'root' })
export class AllSeatsConfigurationService {
    public resourceUrl = SERVER_API_URL + 'api/all-seats-configurations';

    constructor(protected http: HttpClient) {}

    create(allSeatsConfiguration: IAllSeatsConfiguration): Observable<EntityResponseType> {
        return this.http.post<IAllSeatsConfiguration>(this.resourceUrl, allSeatsConfiguration, { observe: 'response' });
    }

    update(allSeatsConfiguration: IAllSeatsConfiguration): Observable<EntityResponseType> {
        return this.http.put<IAllSeatsConfiguration>(this.resourceUrl, allSeatsConfiguration, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAllSeatsConfiguration>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAllSeatsConfiguration[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
