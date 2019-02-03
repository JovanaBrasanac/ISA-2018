import { ITicket } from 'app/shared/model//ticket.model';

export interface IAirportReview {
    id?: number;
    description?: string;
    grade?: number;
    ticket?: ITicket;
}

export class AirportReview implements IAirportReview {
    constructor(public id?: number, public description?: string, public grade?: number, public ticket?: ITicket) {}
}
