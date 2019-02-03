/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TicketsTestModule } from '../../../test.module';
import { SeatComponent } from 'app/entities/seat/seat.component';
import { SeatService } from 'app/entities/seat/seat.service';
import { Seat } from 'app/shared/model/seat.model';

describe('Component Tests', () => {
    describe('Seat Management Component', () => {
        let comp: SeatComponent;
        let fixture: ComponentFixture<SeatComponent>;
        let service: SeatService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TicketsTestModule],
                declarations: [SeatComponent],
                providers: []
            })
                .overrideTemplate(SeatComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SeatComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SeatService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Seat(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.seats[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
