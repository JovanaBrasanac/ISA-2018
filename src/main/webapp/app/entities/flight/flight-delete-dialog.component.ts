import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFlight } from 'app/shared/model/flight.model';
import { FlightService } from './flight.service';

@Component({
    selector: 'jhi-flight-delete-dialog',
    templateUrl: './flight-delete-dialog.component.html'
})
export class FlightDeleteDialogComponent {
    flight: IFlight;

    constructor(protected flightService: FlightService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.flightService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'flightListModification',
                content: 'Deleted an flight'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-flight-delete-popup',
    template: ''
})
export class FlightDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ flight }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FlightDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.flight = flight;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
