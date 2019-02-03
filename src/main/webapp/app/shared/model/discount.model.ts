import { ISeat } from 'app/shared/model//seat.model';

export interface IDiscount {
    id?: number;
    name?: string;
    percentage?: number;
    seats?: ISeat[];
}

export class Discount implements IDiscount {
    constructor(public id?: number, public name?: string, public percentage?: number, public seats?: ISeat[]) {}
}
