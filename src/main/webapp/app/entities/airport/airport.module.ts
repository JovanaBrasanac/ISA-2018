import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TicketsSharedModule } from 'app/shared';
import {
    AirportComponent,
    AirportDetailComponent,
    AirportUpdateComponent,
    AirportDeletePopupComponent,
    AirportDeleteDialogComponent,
    airportRoute,
    airportPopupRoute
} from './';

const ENTITY_STATES = [...airportRoute, ...airportPopupRoute];

@NgModule({
    imports: [TicketsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AirportComponent,
        AirportDetailComponent,
        AirportUpdateComponent,
        AirportDeleteDialogComponent,
        AirportDeletePopupComponent
    ],
    entryComponents: [AirportComponent, AirportUpdateComponent, AirportDeleteDialogComponent, AirportDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TicketsAirportModule {}
