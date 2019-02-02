import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TicketsSharedModule } from 'app/shared';
import { TicketsAdminModule } from 'app/admin/admin.module';
import {
    UserExtraComponent,
    UserExtraDetailComponent,
    UserExtraUpdateComponent,
    UserExtraDeletePopupComponent,
    UserExtraDeleteDialogComponent,
    userExtraRoute,
    userExtraPopupRoute
} from './';

const ENTITY_STATES = [...userExtraRoute, ...userExtraPopupRoute];

@NgModule({
    imports: [TicketsSharedModule, TicketsAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        UserExtraComponent,
        UserExtraDetailComponent,
        UserExtraUpdateComponent,
        UserExtraDeleteDialogComponent,
        UserExtraDeletePopupComponent
    ],
    entryComponents: [UserExtraComponent, UserExtraUpdateComponent, UserExtraDeleteDialogComponent, UserExtraDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TicketsUserExtraModule {}
