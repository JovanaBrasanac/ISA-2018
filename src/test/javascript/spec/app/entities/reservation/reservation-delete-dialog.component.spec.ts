/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TicketsTestModule } from '../../../test.module';
import { ReservationDeleteDialogComponent } from 'app/entities/reservation/reservation-delete-dialog.component';
import { ReservationService } from 'app/entities/reservation/reservation.service';

describe('Component Tests', () => {
    describe('Reservation Management Delete Component', () => {
        let comp: ReservationDeleteDialogComponent;
        let fixture: ComponentFixture<ReservationDeleteDialogComponent>;
        let service: ReservationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TicketsTestModule],
                declarations: [ReservationDeleteDialogComponent]
            })
                .overrideTemplate(ReservationDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ReservationDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReservationService);
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
