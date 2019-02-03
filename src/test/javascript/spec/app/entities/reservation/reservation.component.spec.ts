/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TicketsTestModule } from '../../../test.module';
import { ReservationComponent } from 'app/entities/reservation/reservation.component';
import { ReservationService } from 'app/entities/reservation/reservation.service';
import { Reservation } from 'app/shared/model/reservation.model';

describe('Component Tests', () => {
    describe('Reservation Management Component', () => {
        let comp: ReservationComponent;
        let fixture: ComponentFixture<ReservationComponent>;
        let service: ReservationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TicketsTestModule],
                declarations: [ReservationComponent],
                providers: []
            })
                .overrideTemplate(ReservationComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ReservationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReservationService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Reservation(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.reservations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
