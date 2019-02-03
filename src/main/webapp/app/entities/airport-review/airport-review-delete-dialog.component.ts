import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAirportReview } from 'app/shared/model/airport-review.model';
import { AirportReviewService } from './airport-review.service';

@Component({
    selector: 'jhi-airport-review-delete-dialog',
    templateUrl: './airport-review-delete-dialog.component.html'
})
export class AirportReviewDeleteDialogComponent {
    airportReview: IAirportReview;

    constructor(
        protected airportReviewService: AirportReviewService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.airportReviewService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'airportReviewListModification',
                content: 'Deleted an airportReview'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-airport-review-delete-popup',
    template: ''
})
export class AirportReviewDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ airportReview }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AirportReviewDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.airportReview = airportReview;
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
