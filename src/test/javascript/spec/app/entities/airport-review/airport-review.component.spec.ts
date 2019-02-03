/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TicketsTestModule } from '../../../test.module';
import { AirportReviewComponent } from 'app/entities/airport-review/airport-review.component';
import { AirportReviewService } from 'app/entities/airport-review/airport-review.service';
import { AirportReview } from 'app/shared/model/airport-review.model';

describe('Component Tests', () => {
    describe('AirportReview Management Component', () => {
        let comp: AirportReviewComponent;
        let fixture: ComponentFixture<AirportReviewComponent>;
        let service: AirportReviewService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TicketsTestModule],
                declarations: [AirportReviewComponent],
                providers: []
            })
                .overrideTemplate(AirportReviewComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AirportReviewComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AirportReviewService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AirportReview(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.airportReviews[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
