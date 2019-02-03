import { IUser } from 'app/core/user/user.model';
import { IAirline } from 'app/shared/model//airline.model';
import { IReservation } from 'app/shared/model//reservation.model';

export interface IUserExtra {
    id?: number;
    phone?: string;
    city?: string;
    user?: IUser;
    airlineAdmin?: IAirline;
    reservations?: IReservation[];
}

export class UserExtra implements IUserExtra {
    constructor(
        public id?: number,
        public phone?: string,
        public city?: string,
        public user?: IUser,
        public airlineAdmin?: IAirline,
        public reservations?: IReservation[]
    ) {}
}
