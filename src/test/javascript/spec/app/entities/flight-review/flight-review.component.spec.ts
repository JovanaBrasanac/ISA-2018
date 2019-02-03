/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TicketsTestModule } from '../../../test.module';
import { FlightReviewComponent } from 'app/entities/flight-review/flight-review.component';
import { FlightReviewService } from 'app/entities/flight-review/flight-review.service';
import { FlightReview } from 'app/shared/model/flight-review.model';

describe('Component Tests', () => {
    describe('FlightReview Management Component', () => {
        let comp: FlightReviewComponent;
        let fixture: ComponentFixture<FlightReviewComponent>;
        let service: FlightReviewService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TicketsTestModule],
                declarations: [FlightReviewComponent],
                providers: []
            })
                .overrideTemplate(FlightReviewComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FlightReviewComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FlightReviewService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new FlightReview(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.flightReviews[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
