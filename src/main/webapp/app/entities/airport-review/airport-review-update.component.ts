import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IAirportReview } from 'app/shared/model/airport-review.model';
import { AirportReviewService } from './airport-review.service';
import { ITicket } from 'app/shared/model/ticket.model';
import { TicketService } from 'app/entities/ticket';

@Component({
    selector: 'jhi-airport-review-update',
    templateUrl: './airport-review-update.component.html'
})
export class AirportReviewUpdateComponent implements OnInit {
    airportReview: IAirportReview;
    isSaving: boolean;

    tickets: ITicket[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected airportReviewService: AirportReviewService,
        protected ticketService: TicketService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ airportReview }) => {
            this.airportReview = airportReview;
        });
        this.ticketService.query({ filter: 'airportreview-is-null' }).subscribe(
            (res: HttpResponse<ITicket[]>) => {
                if (!this.airportReview.ticket || !this.airportReview.ticket.id) {
                    this.tickets = res.body;
                } else {
                    this.ticketService.find(this.airportReview.ticket.id).subscribe(
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
        if (this.airportReview.id !== undefined) {
            this.subscribeToSaveResponse(this.airportReviewService.update(this.airportReview));
        } else {
            this.subscribeToSaveResponse(this.airportReviewService.create(this.airportReview));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAirportReview>>) {
        result.subscribe((res: HttpResponse<IAirportReview>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
