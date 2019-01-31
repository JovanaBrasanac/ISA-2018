import { NgModule } from '@angular/core';

import { TicketsSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [TicketsSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [TicketsSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class TicketsSharedCommonModule {}
