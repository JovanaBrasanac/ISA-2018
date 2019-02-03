/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TicketsTestModule } from '../../../test.module';
import { AirportReviewDetailComponent } from 'app/entities/airport-review/airport-review-detail.component';
import { AirportReview } from 'app/shared/model/airport-review.model';

describe('Component Tests', () => {
    describe('AirportReview Management Detail Component', () => {
        let comp: AirportReviewDetailComponent;
        let fixture: ComponentFixture<AirportReviewDetailComponent>;
        const route = ({ data: of({ airportReview: new AirportReview(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TicketsTestModule],
                declarations: [AirportReviewDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AirportReviewDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AirportReviewDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.airportReview).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
