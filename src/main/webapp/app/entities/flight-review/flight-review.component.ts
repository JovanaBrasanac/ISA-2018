import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFlightReview } from 'app/shared/model/flight-review.model';
import { AccountService } from 'app/core';
import { FlightReviewService } from './flight-review.service';

@Component({
    selector: 'jhi-flight-review',
    templateUrl: './flight-review.component.html'
})
export class FlightReviewComponent implements OnInit, OnDestroy {
    flightReviews: IFlightReview[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected flightReviewService: FlightReviewService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.flightReviewService.query().subscribe(
            (res: HttpResponse<IFlightReview[]>) => {
                this.flightReviews = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFlightReviews();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFlightReview) {
        return item.id;
    }

    registerChangeInFlightReviews() {
        this.eventSubscriber = this.eventManager.subscribe('flightReviewListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
