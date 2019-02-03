import { Moment } from 'moment';
import { IAllSeatsConfiguration } from 'app/shared/model//all-seats-configuration.model';
import { IAirport } from 'app/shared/model//airport.model';

export interface IFlight {
    id?: number;
    startLocation?: string;
    endLocation?: string;
    startDate?: Moment;
    endDate?: Moment;
    startTime?: string;
    endTime?: string;
    timeOfFlight?: string;
    length?: string;
    numberOfChanges?: number;
    locationOfChanges?: string;
    flightCode?: string;
    allSeats?: IAllSeatsConfiguration;
    airport?: IAirport;
}

export class Flight implements IFlight {
    constructor(
        public id?: number,
        public startLocation?: string,
        public endLocation?: string,
        public startDate?: Moment,
        public endDate?: Moment,
        public startTime?: string,
        public endTime?: string,
        public timeOfFlight?: string,
        public length?: string,
        public numberOfChanges?: number,
        public locationOfChanges?: string,
        public flightCode?: string,
        public allSeats?: IAllSeatsConfiguration,
        public airport?: IAirport
    ) {}
}
