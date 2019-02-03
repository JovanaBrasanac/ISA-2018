import { ITicket } from 'app/shared/model//ticket.model';

export interface IFlightReview {
    id?: number;
    description?: string;
    grade?: number;
    ticket?: ITicket;
}

export class FlightReview implements IFlightReview {
    constructor(public id?: number, public description?: string, public grade?: number, public ticket?: ITicket) {}
}
