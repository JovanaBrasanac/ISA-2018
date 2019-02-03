/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TicketsTestModule } from '../../../test.module';
import { AirportComponent } from 'app/entities/airport/airport.component';
import { AirportService } from 'app/entities/airport/airport.service';
import { Airport } from 'app/shared/model/airport.model';

describe('Component Tests', () => {
    describe('Airport Management Component', () => {
        let comp: AirportComponent;
        let fixture: ComponentFixture<AirportComponent>;
        let service: AirportService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TicketsTestModule],
                declarations: [AirportComponent],
                providers: []
            })
                .overrideTemplate(AirportComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AirportComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AirportService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Airport(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.airports[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
