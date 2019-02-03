import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDiscount } from 'app/shared/model/discount.model';

@Component({
    selector: 'jhi-discount-detail',
    templateUrl: './discount-detail.component.html'
})
export class DiscountDetailComponent implements OnInit {
    discount: IDiscount;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ discount }) => {
            this.discount = discount;
        });
    }

    previousState() {
        window.history.back();
    }
}
