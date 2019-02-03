import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAllSeatsConfiguration } from 'app/shared/model/all-seats-configuration.model';
import { AllSeatsConfigurationService } from './all-seats-configuration.service';
import { IFlight } from 'app/shared/model/flight.model';
import { FlightService } from 'app/entities/flight';

@Component({
    selector: 'jhi-all-seats-configuration-update',
    templateUrl: './all-seats-configuration-update.component.html'
})
export class AllSeatsConfigurationUpdateComponent implements OnInit {
    allSeatsConfiguration: IAllSeatsConfiguration;
    isSaving: boolean;

    flights: IFlight[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected allSeatsConfigurationService: AllSeatsConfigurationService,
        protected flightService: FlightService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ allSeatsConfiguration }) => {
            this.allSeatsConfiguration = allSeatsConfiguration;
        });
        this.flightService.query().subscribe(
            (res: HttpResponse<IFlight[]>) => {
                this.flights = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.allSeatsConfiguration.id !== undefined) {
            this.subscribeToSaveResponse(this.allSeatsConfigurationService.update(this.allSeatsConfiguration));
        } else {
            this.subscribeToSaveResponse(this.allSeatsConfigurationService.create(this.allSeatsConfiguration));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAllSeatsConfiguration>>) {
        result.subscribe(
            (res: HttpResponse<IAllSeatsConfiguration>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
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

    trackFlightById(index: number, item: IFlight) {
        return item.id;
    }
}
