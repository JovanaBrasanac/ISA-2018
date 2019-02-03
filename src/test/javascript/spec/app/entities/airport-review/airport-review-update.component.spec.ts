/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TicketsTestModule } from '../../../test.module';
import { AirportReviewUpdateComponent } from 'app/entities/airport-review/airport-review-update.component';
import { AirportReviewService } from 'app/entities/airport-review/airport-review.service';
import { AirportReview } from 'app/shared/model/airport-review.model';

describe('Component Tests', () => {
    describe('AirportReview Management Update Component', () => {
        let comp: AirportReviewUpdateComponent;
        let fixture: ComponentFixture<AirportReviewUpdateComponent>;
        let service: AirportReviewService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TicketsTestModule],
                declarations: [AirportReviewUpdateComponent]
            })
                .overrideTemplate(AirportReviewUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AirportReviewUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AirportReviewService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new AirportReview(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.airportReview = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new AirportReview();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.airportReview = entity;
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
