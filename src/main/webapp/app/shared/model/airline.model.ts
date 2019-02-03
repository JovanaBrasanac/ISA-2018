import { IAirport } from 'app/shared/model//airport.model';
import { IUserExtra } from 'app/shared/model//user-extra.model';

export interface IAirline {
    id?: number;
    name?: string;
    address?: string;
    description?: string;
    latitude?: number;
    longitude?: number;
    airports?: IAirport[];
    admin?: IUserExtra;
}

export class Airline implements IAirline {
    constructor(
        public id?: number,
        public name?: string,
        public address?: string,
        public description?: string,
        public latitude?: number,
        public longitude?: number,
        public airports?: IAirport[],
        public admin?: IUserExtra
    ) {}
}
