import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IDiscount } from 'app/shared/model/discount.model';

type EntityResponseType = HttpResponse<IDiscount>;
type EntityArrayResponseType = HttpResponse<IDiscount[]>;

@Injectable({ providedIn: 'root' })
export class DiscountService {
    public resourceUrl = SERVER_API_URL + 'api/discounts';

    constructor(protected http: HttpClient) {}

    create(discount: IDiscount): Observable<EntityResponseType> {
        return this.http.post<IDiscount>(this.resourceUrl, discount, { observe: 'response' });
    }

    update(discount: IDiscount): Observable<EntityResponseType> {
        return this.http.put<IDiscount>(this.resourceUrl, discount, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IDiscount>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IDiscount[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
