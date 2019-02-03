import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAirline } from 'app/shared/model/airline.model';
import { AccountService } from 'app/core';
import { AirlineService } from './airline.service';

@Component({
    selector: 'jhi-airline',
    templateUrl: './airline.component.html'
})
export class AirlineComponent implements OnInit, OnDestroy {
    airlines: IAirline[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected airlineService: AirlineService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.airlineService.query().subscribe(
            (res: HttpResponse<IAirline[]>) => {
                this.airlines = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAirlines();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAirline) {
        return item.id;
    }

    registerChangeInAirlines() {
        this.eventSubscriber = this.eventManager.subscribe('airlineListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
