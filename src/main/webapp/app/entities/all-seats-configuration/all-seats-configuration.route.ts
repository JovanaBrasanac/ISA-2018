import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AllSeatsConfiguration } from 'app/shared/model/all-seats-configuration.model';
import { AllSeatsConfigurationService } from './all-seats-configuration.service';
import { AllSeatsConfigurationComponent } from './all-seats-configuration.component';
import { AllSeatsConfigurationDetailComponent } from './all-seats-configuration-detail.component';
import { AllSeatsConfigurationUpdateComponent } from './all-seats-configuration-update.component';
import { AllSeatsConfigurationDeletePopupComponent } from './all-seats-configuration-delete-dialog.component';
import { IAllSeatsConfiguration } from 'app/shared/model/all-seats-configuration.model';

@Injectable({ providedIn: 'root' })
export class AllSeatsConfigurationResolve implements Resolve<IAllSeatsConfiguration> {
    constructor(private service: AllSeatsConfigurationService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<AllSeatsConfiguration> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<AllSeatsConfiguration>) => response.ok),
                map((allSeatsConfiguration: HttpResponse<AllSeatsConfiguration>) => allSeatsConfiguration.body)
            );
        }
        return of(new AllSeatsConfiguration());
    }
}

export const allSeatsConfigurationRoute: Routes = [
    {
        path: 'all-seats-configuration',
        component: AllSeatsConfigurationComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AllSeatsConfigurations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'all-seats-configuration/:id/view',
        component: AllSeatsConfigurationDetailComponent,
        resolve: {
            allSeatsConfiguration: AllSeatsConfigurationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AllSeatsConfigurations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'all-seats-configuration/new',
        component: AllSeatsConfigurationUpdateComponent,
        resolve: {
            allSeatsConfiguration: AllSeatsConfigurationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AllSeatsConfigurations'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'all-seats-configuration/:id/edit',
        component: AllSeatsConfigurationUpdateComponent,
        resolve: {
            allSeatsConfiguration: AllSeatsConfigurationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AllSeatsConfigurations'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const allSeatsConfigurationPopupRoute: Routes = [
    {
        path: 'all-seats-configuration/:id/delete',
        component: AllSeatsConfigurationDeletePopupComponent,
        resolve: {
            allSeatsConfiguration: AllSeatsConfigurationResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'AllSeatsConfigurations'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
