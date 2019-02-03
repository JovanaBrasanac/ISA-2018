import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TicketsSharedModule } from 'app/shared';
import {
    FlightReviewComponent,
    FlightReviewDetailComponent,
    FlightReviewUpdateComponent,
    FlightReviewDeletePopupComponent,
    FlightReviewDeleteDialogComponent,
    flightReviewRoute,
    flightReviewPopupRoute
} from './';

const ENTITY_STATES = [...flightReviewRoute, ...flightReviewPopupRoute];

@NgModule({
    imports: [TicketsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FlightReviewComponent,
        FlightReviewDetailComponent,
        FlightReviewUpdateComponent,
        FlightReviewDeleteDialogComponent,
        FlightReviewDeletePopupComponent
    ],
    entryComponents: [
        FlightReviewComponent,
        FlightReviewUpdateComponent,
        FlightReviewDeleteDialogComponent,
        FlightReviewDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TicketsFlightReviewModule {}
