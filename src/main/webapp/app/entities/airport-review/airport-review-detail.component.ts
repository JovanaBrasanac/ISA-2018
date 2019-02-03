import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAirportReview } from 'app/shared/model/airport-review.model';

@Component({
    selector: 'jhi-airport-review-detail',
    templateUrl: './airport-review-detail.component.html'
})
export class AirportReviewDetailComponent implements OnInit {
    airportReview: IAirportReview;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ airportReview }) => {
            this.airportReview = airportReview;
        });
    }

    previousState() {
        window.history.back();
    }
}
