import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFlightReview } from 'app/shared/model/flight-review.model';
import { FlightReviewService } from './flight-review.service';

@Component({
    selector: 'jhi-flight-review-delete-dialog',
    templateUrl: './flight-review-delete-dialog.component.html'
})
export class FlightReviewDeleteDialogComponent {
    flightReview: IFlightReview;

    constructor(
        protected flightReviewService: FlightReviewService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.flightReviewService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'flightReviewListModification',
                content: 'Deleted an flightReview'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-flight-review-delete-popup',
    template: ''
})
export class FlightReviewDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ flightReview }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FlightReviewDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.flightReview = flightReview;
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
