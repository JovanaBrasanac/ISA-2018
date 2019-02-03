/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TicketsTestModule } from '../../../test.module';
import { AirportReviewDeleteDialogComponent } from 'app/entities/airport-review/airport-review-delete-dialog.component';
import { AirportReviewService } from 'app/entities/airport-review/airport-review.service';

describe('Component Tests', () => {
    describe('AirportReview Management Delete Component', () => {
        let comp: AirportReviewDeleteDialogComponent;
        let fixture: ComponentFixture<AirportReviewDeleteDialogComponent>;
        let service: AirportReviewService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TicketsTestModule],
                declarations: [AirportReviewDeleteDialogComponent]
            })
                .overrideTemplate(AirportReviewDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AirportReviewDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AirportReviewService);
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
