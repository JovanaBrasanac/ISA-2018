import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TicketsUserExtraModule } from './user-extra/user-extra.module';
import { TicketsAirlineModule } from './airline/airline.module';
import { TicketsAirportModule } from './airport/airport.module';
import { TicketsFlightModule } from './flight/flight.module';
import { TicketsAllSeatsConfigurationModule } from './all-seats-configuration/all-seats-configuration.module';
import { TicketsSeatModule } from './seat/seat.module';
import { TicketsTicketModule } from './ticket/ticket.module';
import { TicketsReservationModule } from './reservation/reservation.module';
import { TicketsAirportReviewModule } from './airport-review/airport-review.module';
import { TicketsFlightReviewModule } from './flight-review/flight-review.module';
import { TicketsDiscountModule } from './discount/discount.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        TicketsUserExtraModule,
        TicketsAirlineModule,
        TicketsAirportModule,
        TicketsFlightModule,
        TicketsAllSeatsConfigurationModule,
        TicketsSeatModule,
        TicketsTicketModule,
        TicketsReservationModule,
        TicketsAirportReviewModule,
        TicketsFlightReviewModule,
        TicketsDiscountModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TicketsEntityModule {}
