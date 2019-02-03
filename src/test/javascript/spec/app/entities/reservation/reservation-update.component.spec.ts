/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TicketsTestModule } from '../../../test.module';
import { ReservationUpdateComponent } from 'app/entities/reservation/reservation-update.component';
import { ReservationService } from 'app/entities/reservation/reservation.service';
import { Reservation } from 'app/shared/model/reservation.model';

describe('Component Tests', () => {
    describe('Reservation Management Update Component', () => {
        let comp: ReservationUpdateComponent;
        let fixture: ComponentFixture<ReservationUpdateComponent>;
        let service: ReservationService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TicketsTestModule],
                declarations: [ReservationUpdateComponent]
            })
                .overrideTemplate(ReservationUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ReservationUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReservationService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Reservation(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.reservation = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Reservation();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.reservation = entity;
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
