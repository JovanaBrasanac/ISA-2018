import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IUserExtra } from 'app/shared/model/user-extra.model';
import { AccountService } from 'app/core';
import { UserExtraService } from './user-extra.service';

@Component({
    selector: 'jhi-user-extra',
    templateUrl: './user-extra.component.html'
})
export class UserExtraComponent implements OnInit, OnDestroy {
    userExtras: IUserExtra[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected userExtraService: UserExtraService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.userExtraService.query().subscribe(
            (res: HttpResponse<IUserExtra[]>) => {
                this.userExtras = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInUserExtras();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IUserExtra) {
        return item.id;
    }

    registerChangeInUserExtras() {
        this.eventSubscriber = this.eventManager.subscribe('userExtraListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
