/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TicketsTestModule } from '../../../test.module';
import { FlightReviewDetailComponent } from 'app/entities/flight-review/flight-review-detail.component';
import { FlightReview } from 'app/shared/model/flight-review.model';

describe('Component Tests', () => {
    describe('FlightReview Management Detail Component', () => {
        let comp: FlightReviewDetailComponent;
        let fixture: ComponentFixture<FlightReviewDetailComponent>;
        const route = ({ data: of({ flightReview: new FlightReview(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TicketsTestModule],
                declarations: [FlightReviewDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FlightReviewDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FlightReviewDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.flightReview).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
