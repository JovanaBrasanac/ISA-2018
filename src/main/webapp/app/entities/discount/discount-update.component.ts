import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IDiscount } from 'app/shared/model/discount.model';
import { DiscountService } from './discount.service';

@Component({
    selector: 'jhi-discount-update',
    templateUrl: './discount-update.component.html'
})
export class DiscountUpdateComponent implements OnInit {
    discount: IDiscount;
    isSaving: boolean;

    constructor(protected discountService: DiscountService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ discount }) => {
            this.discount = discount;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.discount.id !== undefined) {
            this.subscribeToSaveResponse(this.discountService.update(this.discount));
        } else {
            this.subscribeToSaveResponse(this.discountService.create(this.discount));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDiscount>>) {
        result.subscribe((res: HttpResponse<IDiscount>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
