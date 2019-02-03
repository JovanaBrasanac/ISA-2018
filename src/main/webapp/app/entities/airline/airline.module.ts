import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TicketsSharedModule } from 'app/shared';
import {
    AirlineComponent,
    AirlineDetailComponent,
    AirlineUpdateComponent,
    AirlineDeletePopupComponent,
    AirlineDeleteDialogComponent,
    airlineRoute,
    airlinePopupRoute
} from './';

const ENTITY_STATES = [...airlineRoute, ...airlinePopupRoute];

@NgModule({
    imports: [TicketsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AirlineComponent,
        AirlineDetailComponent,
        AirlineUpdateComponent,
        AirlineDeleteDialogComponent,
        AirlineDeletePopupComponent
    ],
    entryComponents: [AirlineComponent, AirlineUpdateComponent, AirlineDeleteDialogComponent, AirlineDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TicketsAirlineModule {}
