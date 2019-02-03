/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TicketsTestModule } from '../../../test.module';
import { SeatUpdateComponent } from 'app/entities/seat/seat-update.component';
import { SeatService } from 'app/entities/seat/seat.service';
import { Seat } from 'app/shared/model/seat.model';

describe('Component Tests', () => {
    describe('Seat Management Update Component', () => {
        let comp: SeatUpdateComponent;
        let fixture: ComponentFixture<SeatUpdateComponent>;
        let service: SeatService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TicketsTestModule],
                declarations: [SeatUpdateComponent]
            })
                .overrideTemplate(SeatUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SeatUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SeatService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Seat(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.seat = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Seat();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.seat = entity;
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
