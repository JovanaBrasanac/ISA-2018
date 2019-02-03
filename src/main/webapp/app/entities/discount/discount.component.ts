import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IDiscount } from 'app/shared/model/discount.model';
import { AccountService } from 'app/core';
import { DiscountService } from './discount.service';

@Component({
    selector: 'jhi-discount',
    templateUrl: './discount.component.html'
})
export class DiscountComponent implements OnInit, OnDestroy {
    discounts: IDiscount[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected discountService: DiscountService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.discountService.query().subscribe(
            (res: HttpResponse<IDiscount[]>) => {
                this.discounts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInDiscounts();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IDiscount) {
        return item.id;
    }

    registerChangeInDiscounts() {
        this.eventSubscriber = this.eventManager.subscribe('discountListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
