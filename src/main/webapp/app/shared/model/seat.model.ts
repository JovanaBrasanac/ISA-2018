import { Moment } from 'moment';
import { ITicket } from 'app/shared/model//ticket.model';
import { IAllSeatsConfiguration } from 'app/shared/model//all-seats-configuration.model';
import { IDiscount } from 'app/shared/model//discount.model';

export const enum SeatType {
    BUSINESS = 'BUSINESS',
    REGULAR = 'REGULAR',
    FIRST = 'FIRST'
}

export interface ISeat {
    id?: number;
    seatType?: SeatType;
    row?: number;
    column?: number;
    price?: number;
    reserved?: boolean;
    dateOfSale?: Moment;
    timeOfSale?: string;
    ticket?: ITicket;
    allSeats?: IAllSeatsConfiguration;
    discount?: IDiscount;
}

export class Seat implements ISeat {
    constructor(
        public id?: number,
        public seatType?: SeatType,
        public row?: number,
        public column?: number,
        public price?: number,
        public reserved?: boolean,
        public dateOfSale?: Moment,
        public timeOfSale?: string,
        public ticket?: ITicket,
        public allSeats?: IAllSeatsConfiguration,
        public discount?: IDiscount
    ) {
        this.reserved = this.reserved || false;
    }
}
