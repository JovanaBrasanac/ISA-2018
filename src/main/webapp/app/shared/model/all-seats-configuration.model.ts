import { ISeat } from 'app/shared/model//seat.model';
import { IFlight } from 'app/shared/model//flight.model';

export interface IAllSeatsConfiguration {
    id?: number;
    name?: string;
    rows?: number;
    columns?: number;
    setas?: ISeat[];
    flight?: IFlight;
}

export class AllSeatsConfiguration implements IAllSeatsConfiguration {
    constructor(
        public id?: number,
        public name?: string,
        public rows?: number,
        public columns?: number,
        public setas?: ISeat[],
        public flight?: IFlight
    ) {}
}
