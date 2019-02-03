/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TicketsTestModule } from '../../../test.module';
import { FlightComponent } from 'app/entities/flight/flight.component';
import { FlightService } from 'app/entities/flight/flight.service';
import { Flight } from 'app/shared/model/flight.model';

describe('Component Tests', () => {
    describe('Flight Management Component', () => {
        let comp: FlightComponent;
        let fixture: ComponentFixture<FlightComponent>;
        let service: FlightService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TicketsTestModule],
                declarations: [FlightComponent],
                providers: []
            })
                .overrideTemplate(FlightComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FlightComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FlightService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Flight(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.flights[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
