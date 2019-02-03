import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IFlightReview } from 'app/shared/model/flight-review.model';
import { FlightReviewService } from './flight-review.service';
import { ITicket } from 'app/shared/model/ticket.model';
import { TicketService } from 'app/entities/ticket';

@Component({
    selector: 'jhi-flight-review-update',
    templateUrl: './flight-review-update.component.html'
})
export class FlightReviewUpdateComponent implements OnInit {
    flightReview: IFlightReview;
    isSaving: boolean;

    tickets: ITicket[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected flightReviewService: FlightReviewService,
        protected ticketService: TicketService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ flightReview }) => {
            this.flightReview = flightReview;
        });
        this.ticketService.query({ filter: 'flightreview-is-null' }).subscribe(
            (res: HttpResponse<ITicket[]>) => {
                if (!this.flightReview.ticket || !this.flightReview.ticket.id) {
                    this.tickets = res.body;
                } else {
                    this.ticketService.find(this.flightReview.ticket.id).subscribe(
                        (subRes: HttpResponse<ITicket>) => {
                            this.tickets = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.flightReview.id !== undefined) {
            this.subscribeToSaveResponse(this.flightReviewService.update(this.flightReview));
        } else {
            this.subscribeToSaveResponse(this.flightReviewService.create(this.flightReview));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFlightReview>>) {
        result.subscribe((res: HttpResponse<IFlightReview>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
}
