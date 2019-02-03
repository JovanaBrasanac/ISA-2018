import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ITicket } from 'app/shared/model/ticket.model';
import { TicketService } from './ticket.service';
import { ISeat } from 'app/shared/model/seat.model';
import { SeatService } from 'app/entities/seat';
import { IAirportReview } from 'app/shared/model/airport-review.model';
import { AirportReviewService } from 'app/entities/airport-review';
import { IFlightReview } from 'app/shared/model/flight-review.model';
import { FlightReviewService } from 'app/entities/flight-review';
import { IReservation } from 'app/shared/model/reservation.model';
import { ReservationService } from 'app/entities/reservation';

@Component({
    selector: 'jhi-ticket-update',
    templateUrl: './ticket-update.component.html'
})
export class TicketUpdateComponent implements OnInit {
    ticket: ITicket;
    isSaving: boolean;

    seats: ISeat[];

    airportreviews: IAirportReview[];

    flightreviews: IFlightReview[];

    reservations: IReservation[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected ticketService: TicketService,
        protected seatService: SeatService,
        protected airportReviewService: AirportReviewService,
        protected flightReviewService: FlightReviewService,
        protected reservationService: ReservationService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ ticket }) => {
            this.ticket = ticket;
        });
        this.seatService.query({ filter: 'ticket-is-null' }).subscribe(
            (res: HttpResponse<ISeat[]>) => {
                if (!this.ticket.seat || !this.ticket.seat.id) {
                    this.seats = res.body;
                } else {
                    this.seatService.find(this.ticket.seat.id).subscribe(
                        (subRes: HttpResponse<ISeat>) => {
                            this.seats = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.airportReviewService.query().subscribe(
            (res: HttpResponse<IAirportReview[]>) => {
                this.airportreviews = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.flightReviewService.query().subscribe(
            (res: HttpResponse<IFlightReview[]>) => {
                this.flightreviews = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.reservationService.query().subscribe(
            (res: HttpResponse<IReservation[]>) => {
                this.reservations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.ticket.id !== undefined) {
            this.subscribeToSaveResponse(this.ticketService.update(this.ticket));
        } else {
            this.subscribeToSaveResponse(this.ticketService.create(this.ticket));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITicket>>) {
        result.subscribe((res: HttpResponse<ITicket>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackSeatById(index: number, item: ISeat) {
        return item.id;
    }

    trackAirportReviewById(index: number, item: IAirportReview) {
        return item.id;
    }

    trackFlightReviewById(index: number, item: IFlightReview) {
        return item.id;
    }

    trackReservationById(index: number, item: IReservation) {
        return item.id;
    }
}
