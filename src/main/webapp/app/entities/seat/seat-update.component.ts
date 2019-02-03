import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';

import { ISeat } from 'app/shared/model/seat.model';
import { SeatService } from './seat.service';
import { ITicket } from 'app/shared/model/ticket.model';
import { TicketService } from 'app/entities/ticket';
import { IAllSeatsConfiguration } from 'app/shared/model/all-seats-configuration.model';
import { AllSeatsConfigurationService } from 'app/entities/all-seats-configuration';
import { IDiscount } from 'app/shared/model/discount.model';
import { DiscountService } from 'app/entities/discount';

@Component({
    selector: 'jhi-seat-update',
    templateUrl: './seat-update.component.html'
})
export class SeatUpdateComponent implements OnInit {
    seat: ISeat;
    isSaving: boolean;

    tickets: ITicket[];

    allseatsconfigurations: IAllSeatsConfiguration[];

    discounts: IDiscount[];
    dateOfSaleDp: any;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected seatService: SeatService,
        protected ticketService: TicketService,
        protected allSeatsConfigurationService: AllSeatsConfigurationService,
        protected discountService: DiscountService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ seat }) => {
            this.seat = seat;
        });
        this.ticketService.query().subscribe(
            (res: HttpResponse<ITicket[]>) => {
                this.tickets = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.allSeatsConfigurationService.query().subscribe(
            (res: HttpResponse<IAllSeatsConfiguration[]>) => {
                this.allseatsconfigurations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.discountService.query().subscribe(
            (res: HttpResponse<IDiscount[]>) => {
                this.discounts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.seat.id !== undefined) {
            this.subscribeToSaveResponse(this.seatService.update(this.seat));
        } else {
            this.subscribeToSaveResponse(this.seatService.create(this.seat));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISeat>>) {
        result.subscribe((res: HttpResponse<ISeat>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTicketById(index: number, item: ITicket) {
        return item.id;
    }

    trackAllSeatsConfigurationById(index: number, item: IAllSeatsConfiguration) {
        return item.id;
    }

    trackDiscountById(index: number, item: IDiscount) {
        return item.id;
    }
}
