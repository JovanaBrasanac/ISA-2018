import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAllSeatsConfiguration } from 'app/shared/model/all-seats-configuration.model';

@Component({
    selector: 'jhi-all-seats-configuration-detail',
    templateUrl: './all-seats-configuration-detail.component.html'
})
export class AllSeatsConfigurationDetailComponent implements OnInit {
    allSeatsConfiguration: IAllSeatsConfiguration;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ allSeatsConfiguration }) => {
            this.allSeatsConfiguration = allSeatsConfiguration;
        });
    }

    previousState() {
        window.history.back();
    }
}
