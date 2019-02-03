import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { IFlight } from 'app/shared/model/flight.model';
import { FlightService } from './flight.service';
import { IAllSeatsConfiguration } from 'app/shared/model/all-seats-configuration.model';
import { AllSeatsConfigurationService } from 'app/entities/all-seats-configuration';
import { IAirport } from 'app/shared/model/airport.model';
import { AirportService } from 'app/entities/airport';

@Component({
    selector: 'jhi-flight-update',
    templateUrl: './flight-update.component.html'
})
export class FlightUpdateComponent implements OnInit {
    flight: IFlight;
    isSaving: boolean;

    allseats: IAllSeatsConfiguration[];

    airports: IAirport[];
    startDateDp: any;
    endDateDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected flightService: FlightService,
        protected allSeatsConfigurationService: AllSeatsConfigurationService,
        protected airportService: AirportService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ flight }) => {
            this.flight = flight;
        });
        this.allSeatsConfigurationService.query({ filter: 'flight-is-null' }).subscribe(
            (res: HttpResponse<IAllSeatsConfiguration[]>) => {
                if (!this.flight.allSeats || !this.flight.allSeats.id) {
                    this.allseats = res.body;
                } else {
                    this.allSeatsConfigurationService.find(this.flight.allSeats.id).subscribe(
                        (subRes: HttpResponse<IAllSeatsConfiguration>) => {
                            this.allseats = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.airportService.query().subscribe(
            (res: HttpResponse<IAirport[]>) => {
                this.airports = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.flight.id !== undefined) {
            this.subscribeToSaveResponse(this.flightService.update(this.flight));
        } else {
            this.subscribeToSaveResponse(this.flightService.create(this.flight));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFlight>>) {
        result.subscribe((res: HttpResponse<IFlight>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackAllSeatsConfigurationById(index: number, item: IAllSeatsConfiguration) {
        return item.id;
    }

    trackAirportById(index: number, item: IAirport) {
        return item.id;
    }
}
