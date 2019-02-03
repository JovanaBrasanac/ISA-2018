import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TicketsSharedModule } from 'app/shared';
import {
    AllSeatsConfigurationComponent,
    AllSeatsConfigurationDetailComponent,
    AllSeatsConfigurationUpdateComponent,
    AllSeatsConfigurationDeletePopupComponent,
    AllSeatsConfigurationDeleteDialogComponent,
    allSeatsConfigurationRoute,
    allSeatsConfigurationPopupRoute
} from './';

const ENTITY_STATES = [...allSeatsConfigurationRoute, ...allSeatsConfigurationPopupRoute];

@NgModule({
    imports: [TicketsSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AllSeatsConfigurationComponent,
        AllSeatsConfigurationDetailComponent,
        AllSeatsConfigurationUpdateComponent,
        AllSeatsConfigurationDeleteDialogComponent,
        AllSeatsConfigurationDeletePopupComponent
    ],
    entryComponents: [
        AllSeatsConfigurationComponent,
        AllSeatsConfigurationUpdateComponent,
        AllSeatsConfigurationDeleteDialogComponent,
        AllSeatsConfigurationDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TicketsAllSeatsConfigurationModule {}
