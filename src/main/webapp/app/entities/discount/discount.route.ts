import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Discount } from 'app/shared/model/discount.model';
import { DiscountService } from './discount.service';
import { DiscountComponent } from './discount.component';
import { DiscountDetailComponent } from './discount-detail.component';
import { DiscountUpdateComponent } from './discount-update.component';
import { DiscountDeletePopupComponent } from './discount-delete-dialog.component';
import { IDiscount } from 'app/shared/model/discount.model';

@Injectable({ providedIn: 'root' })
export class DiscountResolve implements Resolve<IDiscount> {
    constructor(private service: DiscountService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Discount> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Discount>) => response.ok),
                map((discount: HttpResponse<Discount>) => discount.body)
            );
        }
        return of(new Discount());
    }
}

export const discountRoute: Routes = [
    {
        path: 'discount',
        component: DiscountComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Discounts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'discount/:id/view',
        component: DiscountDetailComponent,
        resolve: {
            discount: DiscountResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Discounts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'discount/new',
        component: DiscountUpdateComponent,
        resolve: {
            discount: DiscountResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Discounts'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'discount/:id/edit',
        component: DiscountUpdateComponent,
        resolve: {
            discount: DiscountResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Discounts'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const discountPopupRoute: Routes = [
    {
        path: 'discount/:id/delete',
        component: DiscountDeletePopupComponent,
        resolve: {
            discount: DiscountResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Discounts'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
