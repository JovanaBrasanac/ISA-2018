import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDiscount } from 'app/shared/model/discount.model';
import { DiscountService } from './discount.service';

@Component({
    selector: 'jhi-discount-delete-dialog',
    templateUrl: './discount-delete-dialog.component.html'
})
export class DiscountDeleteDialogComponent {
    discount: IDiscount;

    constructor(protected discountService: DiscountService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.discountService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'discountListModification',
                content: 'Deleted an discount'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-discount-delete-popup',
    template: ''
})
export class DiscountDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ discount }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DiscountDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.discount = discount;
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
