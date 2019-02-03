import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReservation } from 'app/shared/model/reservation.model';

@Component({
    selector: 'jhi-reservation-detail',
    templateUrl: './reservation-detail.component.html'
})
export class ReservationDetailComponent implements OnInit {
    reservation: IReservation;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ reservation }) => {
            this.reservation = reservation;
        });
    }

    previousState() {
        window.history.back();
    }
}
