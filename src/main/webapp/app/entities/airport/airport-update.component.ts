import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAirport } from 'app/shared/model/airport.model';
import { AirportService } from './airport.service';
import { IAirline } from 'app/shared/model/airline.model';
import { AirlineService } from 'app/entities/airline';

@Component({
    selector: 'jhi-airport-update',
    templateUrl: './airport-update.component.html'
})
export class AirportUpdateComponent implements OnInit {
    airport: IAirport;
    isSaving: boolean;

    airlines: IAirline[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected airportService: AirportService,
        protected airlineService: AirlineService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ airport }) => {
            this.airport = airport;
        });
        this.airlineService.query().subscribe(
            (res: HttpResponse<IAirline[]>) => {
                this.airlines = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.airport.id !== undefined) {
            this.subscribeToSaveResponse(this.airportService.update(this.airport));
        } else {
            this.subscribeToSaveResponse(this.airportService.create(this.airport));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAirport>>) {
        result.subscribe((res: HttpResponse<IAirport>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackAirlineById(index: number, item: IAirline) {
        return item.id;
    }
}
