import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISeat } from 'app/shared/model/seat.model';
import { AccountService } from 'app/core';
import { SeatService } from './seat.service';

@Component({
    selector: 'jhi-seat',
    templateUrl: './seat.component.html'
})
export class SeatComponent implements OnInit, OnDestroy {
    seats: ISeat[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected seatService: SeatService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.seatService.query().subscribe(
            (res: HttpResponse<ISeat[]>) => {
                this.seats = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSeats();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISeat) {
        return item.id;
    }

    registerChangeInSeats() {
        this.eventSubscriber = this.eventManager.subscribe('seatListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
