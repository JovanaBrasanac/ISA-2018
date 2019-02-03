import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAllSeatsConfiguration } from 'app/shared/model/all-seats-configuration.model';
import { AccountService } from 'app/core';
import { AllSeatsConfigurationService } from './all-seats-configuration.service';

@Component({
    selector: 'jhi-all-seats-configuration',
    templateUrl: './all-seats-configuration.component.html'
})
export class AllSeatsConfigurationComponent implements OnInit, OnDestroy {
    allSeatsConfigurations: IAllSeatsConfiguration[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected allSeatsConfigurationService: AllSeatsConfigurationService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.allSeatsConfigurationService.query().subscribe(
            (res: HttpResponse<IAllSeatsConfiguration[]>) => {
                this.allSeatsConfigurations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAllSeatsConfigurations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAllSeatsConfiguration) {
        return item.id;
    }

    registerChangeInAllSeatsConfigurations() {
        this.eventSubscriber = this.eventManager.subscribe('allSeatsConfigurationListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
