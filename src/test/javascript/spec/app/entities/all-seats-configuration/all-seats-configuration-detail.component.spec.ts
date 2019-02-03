/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TicketsTestModule } from '../../../test.module';
import { AllSeatsConfigurationDetailComponent } from 'app/entities/all-seats-configuration/all-seats-configuration-detail.component';
import { AllSeatsConfiguration } from 'app/shared/model/all-seats-configuration.model';

describe('Component Tests', () => {
    describe('AllSeatsConfiguration Management Detail Component', () => {
        let comp: AllSeatsConfigurationDetailComponent;
        let fixture: ComponentFixture<AllSeatsConfigurationDetailComponent>;
        const route = ({ data: of({ allSeatsConfiguration: new AllSeatsConfiguration(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TicketsTestModule],
                declarations: [AllSeatsConfigurationDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AllSeatsConfigurationDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AllSeatsConfigurationDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.allSeatsConfiguration).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
