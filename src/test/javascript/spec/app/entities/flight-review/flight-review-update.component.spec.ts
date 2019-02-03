/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TicketsTestModule } from '../../../test.module';
import { FlightReviewUpdateComponent } from 'app/entities/flight-review/flight-review-update.component';
import { FlightReviewService } from 'app/entities/flight-review/flight-review.service';
import { FlightReview } from 'app/shared/model/flight-review.model';

describe('Component Tests', () => {
    describe('FlightReview Management Update Component', () => {
        let comp: FlightReviewUpdateComponent;
        let fixture: ComponentFixture<FlightReviewUpdateComponent>;
        let service: FlightReviewService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TicketsTestModule],
                declarations: [FlightReviewUpdateComponent]
            })
                .overrideTemplate(FlightReviewUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FlightReviewUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FlightReviewService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new FlightReview(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.flightReview = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new FlightReview();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.flightReview = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
