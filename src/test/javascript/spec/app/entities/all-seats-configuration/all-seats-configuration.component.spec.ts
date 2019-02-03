/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TicketsTestModule } from '../../../test.module';
import { AllSeatsConfigurationComponent } from 'app/entities/all-seats-configuration/all-seats-configuration.component';
import { AllSeatsConfigurationService } from 'app/entities/all-seats-configuration/all-seats-configuration.service';
import { AllSeatsConfiguration } from 'app/shared/model/all-seats-configuration.model';

describe('Component Tests', () => {
    describe('AllSeatsConfiguration Management Component', () => {
        let comp: AllSeatsConfigurationComponent;
        let fixture: ComponentFixture<AllSeatsConfigurationComponent>;
        let service: AllSeatsConfigurationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TicketsTestModule],
                declarations: [AllSeatsConfigurationComponent],
                providers: []
            })
                .overrideTemplate(AllSeatsConfigurationComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AllSeatsConfigurationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AllSeatsConfigurationService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AllSeatsConfiguration(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.allSeatsConfigurations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
