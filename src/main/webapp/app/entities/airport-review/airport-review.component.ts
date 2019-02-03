import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAirportReview } from 'app/shared/model/airport-review.model';
import { AccountService } from 'app/core';
import { AirportReviewService } from './airport-review.service';

@Component({
    selector: 'jhi-airport-review',
    templateUrl: './airport-review.component.html'
})
export class AirportReviewComponent implements OnInit, OnDestroy {
    airportReviews: IAirportReview[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected airportReviewService: AirportReviewService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.airportReviewService.query().subscribe(
            (res: HttpResponse<IAirportReview[]>) => {
                this.airportReviews = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAirportReviews();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAirportReview) {
        return item.id;
    }

    registerChangeInAirportReviews() {
        this.eventSubscriber = this.eventManager.subscribe('airportReviewListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
