import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFlight } from 'app/shared/model/flight.model';
import { AccountService } from 'app/core';
import { FlightService } from './flight.service';

@Component({
    selector: 'jhi-flight',
    templateUrl: './flight.component.html'
})
export class FlightComponent implements OnInit, OnDestroy {
    flights: IFlight[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected flightService: FlightService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.flightService.query().subscribe(
            (res: HttpResponse<IFlight[]>) => {
                this.flights = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFlights();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFlight) {
        return item.id;
    }

    registerChangeInFlights() {
        this.eventSubscriber = this.eventManager.subscribe('flightListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
