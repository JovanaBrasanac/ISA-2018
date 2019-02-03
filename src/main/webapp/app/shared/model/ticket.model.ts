import { ISeat } from 'app/shared/model//seat.model';
import { IAirportReview } from 'app/shared/model//airport-review.model';
import { IFlightReview } from 'app/shared/model//flight-review.model';
import { IReservation } from 'app/shared/model//reservation.model';

export interface ITicket {
    id?: number;
    accepted?: boolean;
    seat?: ISeat;
    airportReview?: IAirportReview;
    flightReview?: IFlightReview;
    reservation?: IReservation;
}

export class Ticket implements ITicket {
    constructor(
        public id?: number,
        public accepted?: boolean,
        public seat?: ISeat,
        public airportReview?: IAirportReview,
        public flightReview?: IFlightReview,
        public reservation?: IReservation
    ) {
        this.accepted = this.accepted || false;
    }
}
