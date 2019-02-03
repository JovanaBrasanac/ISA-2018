/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TicketsTestModule } from '../../../test.module';
import { TicketUpdateComponent } from 'app/entities/ticket/ticket-update.component';
import { TicketService } from 'app/entities/ticket/ticket.service';
import { Ticket } from 'app/shared/model/ticket.model';

describe('Component Tests', () => {
    describe('Ticket Management Update Component', () => {
        let comp: TicketUpdateComponent;
        let fixture: ComponentFixture<TicketUpdateComponent>;
        let service: TicketService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TicketsTestModule],
                declarations: [TicketUpdateComponent]
            })
                .overrideTemplate(TicketUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TicketUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TicketService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Ticket(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.ticket = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Ticket();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.ticket = entity;
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
