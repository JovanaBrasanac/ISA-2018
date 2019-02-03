import { IFlight } from 'app/shared/model//flight.model';
import { IAirline } from 'app/shared/model//airline.model';

export interface IAirport {
    id?: number;
    name?: string;
    address?: string;
    flights?: IFlight[];
    airline?: IAirline;
}

export class Airport implements IAirport {
    constructor(public id?: number, public name?: string, public address?: string, public flights?: IFlight[], public airline?: IAirline) {}
}
