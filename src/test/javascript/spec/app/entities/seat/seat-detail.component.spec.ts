/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TicketsTestModule } from '../../../test.module';
import { SeatDetailComponent } from 'app/entities/seat/seat-detail.component';
import { Seat } from 'app/shared/model/seat.model';

describe('Component Tests', () => {
    describe('Seat Management Detail Component', () => {
        let comp: SeatDetailComponent;
        let fixture: ComponentFixture<SeatDetailComponent>;
        const route = ({ data: of({ seat: new Seat(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TicketsTestModule],
                declarations: [SeatDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SeatDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SeatDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.seat).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
