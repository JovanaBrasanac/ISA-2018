import { ITicket } from 'app/shared/model//ticket.model';
import { IUserExtra } from 'app/shared/model//user-extra.model';

export interface IReservation {
    id?: number;
    numberOfSeats?: number;
    tickets?: ITicket[];
    reservingUser?: IUserExtra;
}

export class Reservation implements IReservation {
    constructor(public id?: number, public numberOfSeats?: number, public tickets?: ITicket[], public reservingUser?: IUserExtra) {}
}
