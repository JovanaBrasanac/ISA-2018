/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TicketsTestModule } from '../../../test.module';
import { DiscountDeleteDialogComponent } from 'app/entities/discount/discount-delete-dialog.component';
import { DiscountService } from 'app/entities/discount/discount.service';

describe('Component Tests', () => {
    describe('Discount Management Delete Component', () => {
        let comp: DiscountDeleteDialogComponent;
        let fixture: ComponentFixture<DiscountDeleteDialogComponent>;
        let service: DiscountService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TicketsTestModule],
                declarations: [DiscountDeleteDialogComponent]
            })
                .overrideTemplate(DiscountDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(DiscountDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiscountService);
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
