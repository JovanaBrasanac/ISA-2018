import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AirportReview } from 'app/shared/model/airport-review.model';
import { AirportReviewService } from './airport-review.service';
import { AirportReviewComponent } from './airport-review.component';
import { AirportReviewDetailComponent } from './airport-review-detail.component';
import { AirportReviewUpdateComponent } from './airport-review-update.component';
import { AirportReviewDeletePopupComponent } from './airport-review-delete-dialog.component';
import { IAirportReview } from 'app/shared/model/airport-review.model';

@Injectable({ providedIn: 'root' })
export class AirportReviewResolve implements Resolve<IAirportReview> {
    constructor(private service: AirportReviewService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AirportReview> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<AirportReview>) => response.ok),
                map((airportReview: HttpResponse<AirportReview>) => airportReview.body)
            );
        }
        return of(new AirportReview());
    }
}

export const airportReviewRoute: Routes = [
    {
        path: 'airport-review',
        component: AirportReviewComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AirportReviews'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'airport-review/:id/view',
        component: AirportReviewDetailComponent,
        resolve: {
            airportReview: AirportReviewResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AirportReviews'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'airport-review/new',
        component: AirportReviewUpdateComponent,
        resolve: {
            airportReview: AirportReviewResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AirportReviews'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'airport-review/:id/edit',
        component: AirportReviewUpdateComponent,
        resolve: {
            airportReview: AirportReviewResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AirportReviews'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const airportReviewPopupRoute: Routes = [
    {
        path: 'airport-review/:id/delete',
        component: AirportReviewDeletePopupComponent,
        resolve: {
            airportReview: AirportReviewResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AirportReviews'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
