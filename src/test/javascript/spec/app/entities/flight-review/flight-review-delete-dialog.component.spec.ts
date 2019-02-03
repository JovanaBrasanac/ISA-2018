/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TicketsTestModule } from '../../../test.module';
import { FlightReviewDeleteDialogComponent } from 'app/entities/flight-review/flight-review-delete-dialog.component';
import { FlightReviewService } from 'app/entities/flight-review/flight-review.service';

describe('Component Tests', () => {
    describe('FlightReview Management Delete Component', () => {
        let comp: FlightReviewDeleteDialogComponent;
        let fixture: ComponentFixture<FlightReviewDeleteDialogComponent>;
        let service: FlightReviewService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TicketsTestModule],
                declarations: [FlightReviewDeleteDialogComponent]
            })
                .overrideTemplate(FlightReviewDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FlightReviewDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FlightReviewService);
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
