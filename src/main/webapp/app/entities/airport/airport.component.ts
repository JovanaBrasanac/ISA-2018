import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAirport } from 'app/shared/model/airport.model';
import { AccountService } from 'app/core';
import { AirportService } from './airport.service';

@Component({
    selector: 'jhi-airport',
    templateUrl: './airport.component.html'
})
export class AirportComponent implements OnInit, OnDestroy {
    airports: IAirport[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected airportService: AirportService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.airportService.query().subscribe(
            (res: HttpResponse<IAirport[]>) => {
                this.airports = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAirports();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAirport) {
        return item.id;
    }

    registerChangeInAirports() {
        this.eventSubscriber = this.eventManager.subscribe('airportListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
