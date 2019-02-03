import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFlightReview } from 'app/shared/model/flight-review.model';

@Component({
    selector: 'jhi-flight-review-detail',
    templateUrl: './flight-review-detail.component.html'
})
export class FlightReviewDetailComponent implements OnInit {
    flightReview: IFlightReview;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ flightReview }) => {
            this.flightReview = flightReview;
        });
    }

    previousState() {
        window.history.back();
    }
}
