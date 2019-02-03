import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Airline } from 'app/shared/model/airline.model';
import { AirlineService } from './airline.service';
import { AirlineComponent } from './airline.component';
import { AirlineDetailComponent } from './airline-detail.component';
import { AirlineUpdateComponent } from './airline-update.component';
import { AirlineDeletePopupComponent } from './airline-delete-dialog.component';
import { IAirline } from 'app/shared/model/airline.model';

@Injectable({ providedIn: 'root' })
export class AirlineResolve implements Resolve<IAirline> {
    constructor(private service: AirlineService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Airline> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Airline>) => response.ok),
                map((airline: HttpResponse<Airline>) => airline.body)
            );
        }
        return of(new Airline());
    }
}

export const airlineRoute: Routes = [
    {
        path: 'airline',
        component: AirlineComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Airlines'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'airline/:id/view',
        component: AirlineDetailComponent,
        resolve: {
            airline: AirlineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Airlines'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'airline/new',
        component: AirlineUpdateComponent,
        resolve: {
            airline: AirlineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Airlines'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'airline/:id/edit',
        component: AirlineUpdateComponent,
        resolve: {
            airline: AirlineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Airlines'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const airlinePopupRoute: Routes = [
    {
        path: 'airline/:id/delete',
        component: AirlineDeletePopupComponent,
        resolve: {
            airline: AirlineResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Airlines'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
