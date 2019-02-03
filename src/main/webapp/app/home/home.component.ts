import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiAlertService, JhiEventManager } from 'ng-jhipster';

import { LoginModalService, AccountService, Account } from 'app/core';
import { IUserExtra } from '../shared/model/user-extra.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { UserExtraService } from 'app/entities/user-extra';

@Component({
    selector: 'jhi-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.scss']
})
export class HomeComponent implements OnInit {
    account: Account;
    modalRef: NgbModalRef;

    userExtras: IUserExtra[];

    constructor(
        private accountService: AccountService,
        private loginModalService: LoginModalService,
        private eventManager: JhiEventManager,
        protected userExtraService: UserExtraService,
        protected jhiAlertService: JhiAlertService
    ) {}

    loadAll() {
        this.userExtraService.query().subscribe((res: HttpResponse<IUserExtra[]>) => {
            this.userExtras = res.body;
        });
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.account = account;
        });
        this.registerAuthenticationSuccess();
    }

    registerAuthenticationSuccess() {
        this.eventManager.subscribe('authenticationSuccess', message => {
            this.accountService.identity().then(account => {
                this.account = account;
            });
        });
    }

    trackId(index: number, item: IUserExtra) {
        return item.id;
    }

    isAuthenticated() {
        return this.accountService.isAuthenticated();
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
}
