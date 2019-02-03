import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FlightReview } from 'app/shared/model/flight-review.model';
import { FlightReviewService } from './flight-review.service';
import { FlightReviewComponent } from './flight-review.component';
import { FlightReviewDetailComponent } from './flight-review-detail.component';
import { FlightReviewUpdateComponent } from './flight-review-update.component';
import { FlightReviewDeletePopupComponent } from './flight-review-delete-dialog.component';
import { IFlightReview } from 'app/shared/model/flight-review.model';

@Injectable({ providedIn: 'root' })
export class FlightReviewResolve implements Resolve<IFlightReview> {
    constructor(private service: FlightReviewService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<FlightReview> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<FlightReview>) => response.ok),
                map((flightReview: HttpResponse<FlightReview>) => flightReview.body)
            );
        }
        return of(new FlightReview());
    }
}

export const flightReviewRoute: Routes = [
    {
        path: 'flight-review',
        component: FlightReviewComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlightReviews'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'flight-review/:id/view',
        component: FlightReviewDetailComponent,
        resolve: {
            flightReview: FlightReviewResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlightReviews'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'flight-review/new',
        component: FlightReviewUpdateComponent,
        resolve: {
            flightReview: FlightReviewResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlightReviews'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'flight-review/:id/edit',
        component: FlightReviewUpdateComponent,
        resolve: {
            flightReview: FlightReviewResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlightReviews'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const flightReviewPopupRoute: Routes = [
    {
        path: 'flight-review/:id/delete',
        component: FlightReviewDeletePopupComponent,
        resolve: {
            flightReview: FlightReviewResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FlightReviews'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
