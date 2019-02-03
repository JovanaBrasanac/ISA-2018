/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TicketsTestModule } from '../../../test.module';
import { AllSeatsConfigurationUpdateComponent } from 'app/entities/all-seats-configuration/all-seats-configuration-update.component';
import { AllSeatsConfigurationService } from 'app/entities/all-seats-configuration/all-seats-configuration.service';
import { AllSeatsConfiguration } from 'app/shared/model/all-seats-configuration.model';

describe('Component Tests', () => {
    describe('AllSeatsConfiguration Management Update Component', () => {
        let comp: AllSeatsConfigurationUpdateComponent;
        let fixture: ComponentFixture<AllSeatsConfigurationUpdateComponent>;
        let service: AllSeatsConfigurationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TicketsTestModule],
                declarations: [AllSeatsConfigurationUpdateComponent]
            })
                .overrideTemplate(AllSeatsConfigurationUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AllSeatsConfigurationUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AllSeatsConfigurationService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new AllSeatsConfiguration(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.allSeatsConfiguration = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new AllSeatsConfiguration();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.allSeatsConfiguration = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
