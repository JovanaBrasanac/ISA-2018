import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAirline } from 'app/shared/model/airline.model';
import { AirlineService } from './airline.service';
import { IUserExtra } from 'app/shared/model/user-extra.model';
import { UserExtraService } from 'app/entities/user-extra';

@Component({
    selector: 'jhi-airline-update',
    templateUrl: './airline-update.component.html'
})
export class AirlineUpdateComponent implements OnInit {
    airline: IAirline;
    isSaving: boolean;

    userextras: IUserExtra[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected airlineService: AirlineService,
        protected userExtraService: UserExtraService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ airline }) => {
            this.airline = airline;
        });
        this.userExtraService.query().subscribe(
            (res: HttpResponse<IUserExtra[]>) => {
                this.userextras = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.airline.id !== undefined) {
            this.subscribeToSaveResponse(this.airlineService.update(this.airline));
        } else {
            this.subscribeToSaveResponse(this.airlineService.create(this.airline));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAirline>>) {
        result.subscribe((res: HttpResponse<IAirline>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserExtraById(index: number, item: IUserExtra) {
        return item.id;
    }
}
