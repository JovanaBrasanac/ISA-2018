import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFlight } from 'app/shared/model/flight.model';

@Component({
    selector: 'jhi-flight-detail',
    templateUrl: './flight-detail.component.html'
})
export class FlightDetailComponent implements OnInit {
    flight: IFlight;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ flight }) => {
            this.flight = flight;
        });
    }

    previousState() {
        window.history.back();
    }
}
