import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IUserExtra } from 'app/shared/model/user-extra.model';
import { UserExtraService } from './user-extra.service';
import { IUser, UserService } from 'app/core';
import { IAirline } from 'app/shared/model/airline.model';
import { AirlineService } from 'app/entities/airline';

@Component({
    selector: 'jhi-user-extra-update',
    templateUrl: './user-extra-update.component.html'
})
export class UserExtraUpdateComponent implements OnInit {
    userExtra: IUserExtra;
    isSaving: boolean;

    users: IUser[];

    airlineadmins: IAirline[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected userExtraService: UserExtraService,
        protected userService: UserService,
        protected airlineService: AirlineService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ userExtra }) => {
            this.userExtra = userExtra;
        });
        this.userService.query().subscribe(
            (res: HttpResponse<IUser[]>) => {
                this.users = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.airlineService.query({ filter: 'admin-is-null' }).subscribe(
            (res: HttpResponse<IAirline[]>) => {
                if (!this.userExtra.airlineAdmin || !this.userExtra.airlineAdmin.id) {
                    this.airlineadmins = res.body;
                } else {
                    this.airlineService.find(this.userExtra.airlineAdmin.id).subscribe(
                        (subRes: HttpResponse<IAirline>) => {
                            this.airlineadmins = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.userExtra.id !== undefined) {
            this.subscribeToSaveResponse(this.userExtraService.update(this.userExtra));
        } else {
            this.subscribeToSaveResponse(this.userExtraService.create(this.userExtra));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserExtra>>) {
        result.subscribe((res: HttpResponse<IUserExtra>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackUserById(index: number, item: IUser) {
        return item.id;
    }

    trackAirlineById(index: number, item: IAirline) {
        return item.id;
    }
}
