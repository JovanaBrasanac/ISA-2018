import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Airport } from 'app/shared/model/airport.model';
import { AirportService } from './airport.service';
import { AirportComponent } from './airport.component';
import { AirportDetailComponent } from './airport-detail.component';
import { AirportUpdateComponent } from './airport-update.component';
import { AirportDeletePopupComponent } from './airport-delete-dialog.component';
import { IAirport } from 'app/shared/model/airport.model';

@Injectable({ providedIn: 'root' })
export class AirportResolve implements Resolve<IAirport> {
    constructor(private service: AirportService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Airport> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Airport>) => response.ok),
                map((airport: HttpResponse<Airport>) => airport.body)
            );
        }
        return of(new Airport());
    }
}

export const airportRoute: Routes = [
    {
        path: 'airport',
        component: AirportComponent,
        data: {
            authorities: ['ROLE_AIRLINE_ADMIN'],
            pageTitle: 'Airports'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'airport/:id/view',
        component: AirportDetailComponent,
        resolve: {
            airport: AirportResolve
        },
        data: {
            authorities: ['ROLE_AIRLINE_ADMIN'],
            pageTitle: 'Airports'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'airport/new',
        component: AirportUpdateComponent,
        resolve: {
            airport: AirportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Airports'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'airport/:id/edit',
        component: AirportUpdateComponent,
        resolve: {
            airport: AirportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Airports'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const airportPopupRoute: Routes = [
    {
        path: 'airport/:id/delete',
        component: AirportDeletePopupComponent,
        resolve: {
            airport: AirportResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Airports'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
