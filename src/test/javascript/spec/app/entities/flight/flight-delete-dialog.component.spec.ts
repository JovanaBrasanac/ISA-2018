/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TicketsTestModule } from '../../../test.module';
import { FlightDeleteDialogComponent } from 'app/entities/flight/flight-delete-dialog.component';
import { FlightService } from 'app/entities/flight/flight.service';

describe('Component Tests', () => {
    describe('Flight Management Delete Component', () => {
        let comp: FlightDeleteDialogComponent;
        let fixture: ComponentFixture<FlightDeleteDialogComponent>;
        let service: FlightService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TicketsTestModule],
                declarations: [FlightDeleteDialogComponent]
            })
                .overrideTemplate(FlightDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FlightDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FlightService);
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
