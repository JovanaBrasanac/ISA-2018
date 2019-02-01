import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TicketsUserExtraModule } from './user-extra/user-extra.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        TicketsUserExtraModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TicketsEntityModule {}
