import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISeat } from 'app/shared/model/seat.model';

@Component({
    selector: 'jhi-seat-detail',
    templateUrl: './seat-detail.component.html'
})
export class SeatDetailComponent implements OnInit {
    seat: ISeat;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ seat }) => {
            this.seat = seat;
        });
    }

    previousState() {
        window.history.back();
    }
}
