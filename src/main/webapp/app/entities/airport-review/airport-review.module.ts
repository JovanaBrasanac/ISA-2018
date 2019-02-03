import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TicketsSharedModule } from 'app/shared';
import {
    AirportReviewComponent,
    AirportReviewDetailComponent,
    AirportReviewUpdateComponent,
    AirportReviewDeletePopupComponent,
    AirportReviewDeleteDialogComponent,
    airportReviewRoute,
    airportReviewPopupRoute
} from './';

const ENTITY_STATES = [...airportReviewRoute, ...airportReviewPopupRoute];

@NgModule({
    imports: [TicketsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AirportReviewComponent,
        AirportReviewDetailComponent,
        AirportReviewUpdateComponent,
        AirportReviewDeleteDialogComponent,
        AirportReviewDeletePopupComponent
    ],
    entryComponents: [
        AirportReviewComponent,
        AirportReviewUpdateComponent,
        AirportReviewDeleteDialogComponent,
        AirportReviewDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TicketsAirportReviewModule {}
