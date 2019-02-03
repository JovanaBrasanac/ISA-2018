import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Seat } from 'app/shared/model/seat.model';
import { SeatService } from './seat.service';
import { SeatComponent } from './seat.component';
import { SeatDetailComponent } from './seat-detail.component';
import { SeatUpdateComponent } from './seat-update.component';
import { SeatDeletePopupComponent } from './seat-delete-dialog.component';
import { ISeat } from 'app/shared/model/seat.model';

@Injectable({ providedIn: 'root' })
export class SeatResolve implements Resolve<ISeat> {
    constructor(private service: SeatService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Seat> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Seat>) => response.ok),
                map((seat: HttpResponse<Seat>) => seat.body)
            );
        }
        return of(new Seat());
    }
}

export const seatRoute: Routes = [
    {
        path: 'seat',
        component: SeatComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Seats'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'seat/:id/view',
        component: SeatDetailComponent,
        resolve: {
            seat: SeatResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Seats'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'seat/new',
        component: SeatUpdateComponent,
        resolve: {
            seat: SeatResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Seats'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'seat/:id/edit',
        component: SeatUpdateComponent,
        resolve: {
            seat: SeatResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Seats'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const seatPopupRoute: Routes = [
    {
        path: 'seat/:id/delete',
        component: SeatDeletePopupComponent,
        resolve: {
            seat: SeatResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Seats'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
