/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TicketsTestModule } from '../../../test.module';
import { AllSeatsConfigurationDeleteDialogComponent } from 'app/entities/all-seats-configuration/all-seats-configuration-delete-dialog.component';
import { AllSeatsConfigurationService } from 'app/entities/all-seats-configuration/all-seats-configuration.service';

describe('Component Tests', () => {
    describe('AllSeatsConfiguration Management Delete Component', () => {
        let comp: AllSeatsConfigurationDeleteDialogComponent;
        let fixture: ComponentFixture<AllSeatsConfigurationDeleteDialogComponent>;
        let service: AllSeatsConfigurationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TicketsTestModule],
                declarations: [AllSeatsConfigurationDeleteDialogComponent]
            })
                .overrideTemplate(AllSeatsConfigurationDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AllSeatsConfigurationDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AllSeatsConfigurationService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
